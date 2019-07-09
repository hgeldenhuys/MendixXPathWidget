// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate. XXX
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "XPath/lib/jquery-1.11.2",
    "XPath/widget/Constructor",
    "dojo/text!XPath/widget/xpathTemplate/XPath.html"
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, _jQuery, widgetTemplate, Constructor) {
    "use strict";
    var $ = _jQuery.noConflict(true);
    // Declare widget's prototype.
    return declare("XPath.widget.XPath", [_WidgetBase, _TemplatedMixin], {
        _alertDiv: null,
        _contextObj: null,
        _handles: null,
        _readOnly: false,
        domain: Constructor.DomainModel,
        entityQualifiedNameAttribute: "",
        jsonAttribute: "",
        templateString: widgetTemplate,
        xPathAttribute: "",
        xPathBrowserNode: null,
        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            this._handles = [];
            this.domain = new Constructor.DomainModel();
        },
        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            if (this.readOnly || this.get("disabled") || this.readonly) {
                this._readOnly = true;
            }
            this._updateRendering();
            this._setupEvents();
        },
        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            console.log(this.id + ".update");
            this._contextObj = obj;
            this._resetSubscriptions();
            this._updateRendering(callback); // We're passing the callback to updateRendering to be called after DOM-manipulation
        },
        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function () {
            console.log(this.id + ".enable");
        },
        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function () {
            console.log(this.id + ".disable");
        },
        // mxui.widget._WidgetBase.resize is called when the page's layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function (box) {
            console.log(this.id + ".resize");
        },
        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
            console.log(this.id + ".uninitialize");
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },
        // We want to stop events on a mobile device
        _stopBubblingEventOnMobile: function (e) {
            console.log(this.id + "._stopBubblingEventOnMobile");
            if (typeof document.ontouchstart !== "undefined") {
                dojoEvent.stop(e);
            }
        },
        // Attach events to HTML dom elements
        _setupEvents: function () {
            console.log(this.id + "._setupEvents");
        },
        _execMf: function (mf, guid, cb) {
            console.log(this.id + "._execMf");
            if (mf && guid) {
                mx.ui.action(mf, {
                    callback: lang.hitch(this, function (objs) {
                        if (cb && typeof cb === "function") {
                            cb(objs);
                        }
                    }),
                    error: function (error) {
                        console.debug(error.description);
                    },
                    params: {
                        applyto: "selection",
                        guids: [guid]
                    }
                }, this);
            }
        },
        // Rerender the interface.
        _updateRendering: function (callback) {
            console.log(this.id + "._updateRendering");
            // this.colorSelectNode.disabled = this._readOnly;
            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");
                // dojoHtml.set(this.infoTextNode, this.messageString);
                // dojoStyle.set(this.infoTextNode, "background-color", colorValue);
            }
            else {
                dojoStyle.set(this.domNode, "display", "none");
            }
            // Important to clear all validations!
            this._clearValidations();
            // The callback, coming from update, needs to be executed, to let the page know it finished rendering
            this._executeCallback(callback, "_updateRendering");
        },
        // Handle validations.
        _handleValidation: function (validations) {
            console.log(this.id + "._handleValidation");
            this._clearValidations();
            var validation = validations[0];
            var message = validation.getReasonByAttribute(this.backgroundColor);
            if (this._readOnly) {
                // validation.removeAttribute(this.backgroundColor);
            }
            else if (message) {
                // this._addValidation(message);
                // validation.removeAttribute(this.backgroundColor);
            }
        },
        // Clear validations.
        _clearValidations: function () {
            console.log(this.id + "._clearValidations");
            dojoConstruct.destroy(this._alertDiv);
            this._alertDiv = null;
        },
        // Show an error message.
        _showError: function (message) {
            console.log(this.id + "._showError");
            if (this._alertDiv !== null) {
                dojoHtml.set(this._alertDiv, message);
                return true;
            }
            this._alertDiv = dojoConstruct.create("div", {
                class: "alert alert-danger",
                innerHTML: message
            });
            dojoConstruct.place(this._alertDiv, this.domNode);
        },
        // Add a validation.
        _addValidation: function (message) {
            console.log(this.id + "._addValidation");
            this._showError(message);
        },
        // Reset subscriptions.
        _resetSubscriptions: function () {
            var _this = this;
            console.log(this.id + "._resetSubscriptions");
            // Release handles on previous object, if any.
            this.unsubscribeAll();
            // When a mendix object exists create subscribtions.
            if (this._contextObj) {
                this.subscribe({
                    callback: lang.hitch(this, function (guid) {
                        _this._updateRendering();
                    }),
                    guid: this._contextObj.getGuid()
                });
                this.subscribe({
                    attr: this.entityQualifiedNameAttribute,
                    callback: lang.hitch(this, function (guid, attr, attrValue) {
                        _this._updateRendering();
                    }),
                    guid: this._contextObj.getGuid()
                });
                this.subscribe({
                    attr: this.xPathAttribute,
                    callback: lang.hitch(this, function (guid, attr, attrValue) {
                        _this._updateRendering();
                    }),
                    guid: this._contextObj.getGuid()
                });
                this.subscribe({
                    callback: lang.hitch(this, this._handleValidation),
                    guid: this._contextObj.getGuid(),
                    val: true
                });
            }
        },
        _executeCallback: function (cb, from) {
            console.log(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});
require(["XPath/widget/XPath"]);
