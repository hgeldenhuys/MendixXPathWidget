var _this = this;
// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
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
    "dojo/on",
    "dojo/text!XPath/widget/template/XPath.html",
    "XPath/widget/lib/Constructor",
    "dijit/form/FilteringSelect",
    "dojo/store/Memory",
    "dojo/dom-construct",
    "dijit"
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, dojoOn, widgetTemplate, xConstructor, FilteringSelect, Memory, domConstruct, dijit, somethingsWrong) {
    "use strict";
    dom.addCss(require.toUrl("XPath/widget/ui/XPath.css"));
    var xpaths = window["xpaths"];
    var XPath = xpaths.XPath;
    var XPathEntity = xpaths.XPathEntity;
    var XPathAttribute = xpaths.XPathAttribute;
    var XPathAssociation = xpaths.XPathAssociation;
    var XPathMember = xpaths.XPathMember;
    var Entity = xpaths.Entity;
    var Attribute = xpaths.Attribute;
    var Association = xpaths.Association;
    var RenderToken = xpaths.RenderToken;
    var RenderExpression = xpaths.RenderExpression;
    var RenderParameter = xpaths.RenderParameter;
    var Render = xpaths.Render;
    var EmptyParameter = xpaths.EmptyParameter;
    var domain = xpaths.domain;
    var ExpressionType = xpaths.ExpressionType;
    var Expression = xpaths.Expression;
    var renderExpression = xpaths.RenderExpression;
    var Condition = xpaths.Condition;
    var EnumParameter = xpaths.EnumParameter;
    var BlankParameter = xpaths.BlankParameter;
    var LiteralParameter = xpaths.LiteralParameter;
    var DataType = xpaths.DataType;
    var getFriendlyRenderExpression = xpaths.getFriendlyRenderExpression;
    var dojoImports = {
        _initialized: false,
        entityStore: null,
        expressionStore: null,
        init: function (entityStore, expressionStore) {
            if (!dojoImports._initialized) {
                dojoImports.entityStore = entityStore;
                dojoImports.expressionStore = expressionStore;
                var conditionLevel_1 = 0;
                var conditionEntity_1 = '';
                var expressionClassValue_1 = '';
                var conditionClass_1 = function () {
                    return conditionEntity_1.replace('.', '_') + "-" + conditionLevel_1 + expressionClassValue_1.replace('.', '_');
                };
                // Render
                Render.prototype.renderDom = function (widget, parentDom) {
                    dojo.place(cr("td", { style: "color: red;" }, "Not implemented for", cr("span", { style: "font-weight: bold" }, " " + functionName(widget.__proto__.constructor))), parentDom);
                    console.error("Implement me!");
                };
                // XPath
                XPath.prototype.renderDom = function (render, parentDom) {
                    var xPath = render;
                    var guid = xPath.id;
                    var fullDom = cr("span", { class: "full-name" }, "//");
                    var readWriteWidget = newReadWriteWidget(guid, fullDom, "x-path", true);
                    var entityTD = cr("td", { class: "x-path-cell " + conditionClass_1() }, readWriteWidget);
                    var entityRow = cr("tr", { class: "x-path-row" }, entityTD);
                    var entityTable = cr("table", { class: "x-path-browser " + conditionClass_1() }, entityRow);
                    dojo.place(entityTable, parentDom);
                    newSelection(guid, dojo.hitch(render, function (selectId, xpathSelected, evt) {
                        xpathSelected.setEntity(dijit.byId(selectId).get('value'));
                    }, guid + "-selector", xPath), dojo.hitch(_this, function () {
                        //
                    }), xPath.rootEntity && xPath.rootEntity.entityName, entityTD, dojoImports.entityStore, false);
                    if (xPath.rootEntity) {
                        xPath.rootEntity.renderDom(xPath.rootEntity, entityRow);
                    }
                };
                // XPathEntity
                XPathEntity.prototype.renderDom = function (xPathEntity, parentDom) {
                    var guid = xPathEntity.id;
                    var moduleName = xPathEntity.entityName.split('.')[0];
                    var entityName = xPathEntity.entityName.split('.')[1];
                    var entityDom = cr("span", { title: "" + xPathEntity.entityName, class: "entity-name" }, entityName);
                    var fullDom = cr("span", { title: moduleName + "." + entityName, class: "full-name" }, entityDom);
                    var entityTD = cr("td", { class: "x-path-entity-cell " + conditionClass_1() }, fullDom);
                    var addConditionDom = cr("td", { class: "x-path-add-condition", title: "Add condition" }, "+");
                    dojoOn(addConditionDom, 'click', dojo.hitch(xPathEntity, function (entity) {
                        entity.addCondition();
                    }, xPathEntity));
                    dojo.place(entityTD, parentDom);
                    dojo.place(addConditionDom, parentDom);
                    if (xPathEntity.hasConditions()) {
                        var conditionTd = cr("td", { class: "x-path-conditions " + conditionClass_1() });
                        dojo.place(conditionTd, parentDom);
                        var conditionTable_1 = cr("table", { class: "x-path-condition-table " + conditionClass_1() });
                        dojo.place(conditionTable_1, conditionTd);
                        xPathEntity.conditions.forEach(function (condition) {
                            conditionEntity_1 += " c-" + condition.id;
                            conditionLevel_1 += 1;
                            var leftConditionDom = cr("td", { class: "x-path-left-condition " + conditionClass_1() }, "[");
                            var conditionDom = cr("td", { class: "x-path-left-condition " + conditionClass_1() });
                            var conditionRow = cr("tr", { class: "x-path-row" });
                            dojo.place(conditionRow, conditionTable_1);
                            dojo.place(leftConditionDom, conditionRow);
                            condition.renderDom(condition, conditionRow);
                            var rightConditionDom = cr("td", { class: "x-path-right-condition " + conditionClass_1() }, "]");
                            var removeConditionDom = cr("td", { class: "x-path-remove-condition", title: "Remove Condition" }, "X");
                            dojo.place(conditionDom, conditionRow);
                            dojo.place(rightConditionDom, conditionRow);
                            dojo.place(removeConditionDom, conditionRow);
                            dojoOn(removeConditionDom, 'click', dojo.hitch(_this, function (entity, selectedCondition) {
                                entity.removeCondition(condition);
                            }, xPathEntity, condition));
                            var underline = dojo.hitch(_this, function (level, evt) {
                                var selector = "." + level.replace(/  /g, ' ').replace(/ /g, '.');
                                dojo.query(selector).forEach(function (domSelected) {
                                    dojo.addClass(domSelected, "condition-highlighted");
                                });
                            }, conditionClass_1());
                            var clear = dojo.hitch(_this, function (level, evt) {
                                var selector = "." + level.replace(/  /g, ' ').replace(/ /g, '.');
                                dojo.query(selector).forEach(function (domSelected) {
                                    dojo.removeClass(domSelected, "condition-highlighted");
                                });
                            }, conditionClass_1());
                            dojoOn(leftConditionDom, 'mouseenter', underline);
                            dojoOn(rightConditionDom, 'mouseenter', underline);
                            dojoOn(leftConditionDom, 'mouseleave', clear);
                            dojoOn(rightConditionDom, 'mouseleave', clear);
                            conditionLevel_1 -= 1;
                            conditionEntity_1 = conditionEntity_1.replace(" c-" + condition.id, '');
                        });
                    }
                    if (!xPathEntity.isRoot()) {
                        var member = xPathEntity.hasMember();
                        var continuePathRead = cr("span", { class: "x-path-continue-path" + (!!xPathEntity ? 'used' : '') }, "" + (!member ? '…' : '/'));
                        var continuePathWrite = newReadWriteWidget("" + guid, continuePathRead, "continue-xpath", true);
                        var continuePathDom = cr("td", { class: " " + conditionClass_1() }, continuePathWrite);
                        dojo.place(continuePathDom, parentDom);
                        newSelection("" + guid, dojo.hitch(xPathEntity, function (selectId, entity, value) {
                            if (value === "") {
                                entity.discardMember();
                            }
                            else {
                                entity.useMember(value);
                            }
                        }, guid + "-selector", xPathEntity), dojo.hitch(_this, function () {
                            //
                        }), xPathEntity.hasMember() && xPathEntity.member.plainValue(), continuePathDom, memberStore(xPathEntity), true);
                        if (xPathEntity.hasMember()) {
                            xPathEntity.member.renderDom(xPathEntity.member, parentDom);
                        }
                    }
                };
                // Condition
                Condition.prototype.renderDom = function (condition, parentDom) {
                    var guid = condition.id;
                    condition.expressions.forEach(function (expression) {
                        expression.renderDom(expression, parentDom);
                    });
                    var addExressionButton = cr("span", { class: "add-expression-button" }, "+");
                    var addExressionWrite = newReadWriteWidget(guid, addExressionButton, "add-expression", true);
                    var expressionDom = cr("td", { class: "add-expression-td " + conditionClass_1() }, addExressionWrite);
                    dojo.place(expressionDom, parentDom);
                    newSelectionAutoComplete(guid, dojo.hitch(condition, function (selectId, conditionSelected, evt) {
                        var expressionType = dojoImports.expressionStore.query({ id: evt })[0].type;
                        condition.addExpression(expressionType);
                    }, guid + "-selector", condition), '', addExressionWrite, dojoImports.expressionStore, true);
                };
                // Expression.
                Expression.prototype.renderDom = function (expression, parentDom) {
                    var guid = expression.id;
                    var highlightGuid = "expression-" + guid;
                    expressionClassValue_1 = expressionClassValue_1 + ' ' + highlightGuid;
                    var expressionRead;
                    var template = renderExpression[expression.expressionType].xpathTemplate.replace("(", "").replace(")", "");
                    var hasParenthesis = expression.expressionType !== ExpressionType.Comma;
                    for (var idx = 0; idx < renderExpression[expression.expressionType].parameterCount; idx++) {
                        var parts = template.split("$" + idx);
                        // If there aren't any clickable text for the function
                        if (idx === 0) {
                            if (parts[0] === "") {
                                expressionRead = cr("span", { class: "x-path-expression-part select" }, " ƒ ");
                            }
                            else {
                                expressionRead = cr("span", { class: "x-path-expression-part" }, " " + parts[0]);
                            }
                            var expressionWrite = newReadWriteWidget(guid, expressionRead, "set-expression", true);
                            var expressionTd = cr("td", { class: "x-path-expression-parts " + conditionClass_1() }, expressionWrite);
                            dojoOn(expressionTd, 'mouseenter', dojo.hitch(_this, function (domOn, queryGuid, evt) {
                                domOn.querySelectorAll("." + queryGuid).forEach(function (subDom) {
                                    dojo.addClass(subDom, 'condition-highlighted');
                                });
                            }, parentDom, highlightGuid));
                            dojoOn(expressionTd, 'mouseleave', dojo.hitch(_this, function (domOn, queryGuid, evt) {
                                domOn.querySelectorAll("." + queryGuid).forEach(function (subDom) {
                                    dojo.removeClass(subDom, 'condition-highlighted');
                                });
                            }, parentDom, highlightGuid));
                            dojo.place(expressionTd, parentDom);
                            var valueId = dojoImports.expressionStore.query({ type: expression.expressionType })[0].id;
                            newSelectionAutoComplete("" + guid, dojo.hitch(expression, function (selectId, selectedExpression, value) {
                                if (value === "remove-expression") {
                                    expression.getCondition().removeExpression(expression);
                                }
                                else {
                                    var newValue = dojoImports.expressionStore.query({ id: value })[0].type;
                                    expression.getCondition().setExpression(selectedExpression, newValue);
                                }
                            }, guid + "-selector", expression), valueId, expressionWrite, dojoImports.expressionStore, true);
                            template = parts[1];
                            if (hasParenthesis) {
                                var leftParButton = cr("td", { class: "left-parenthesis " + conditionClass_1() + " " + (expression.getLeftParenthesis() ? 'selected' : '') }, " (");
                                dojo.place(leftParButton, parentDom);
                                dojoOn(leftParButton, 'click', dojo.hitch(_this, function (selectedExpression, evt) {
                                    selectedExpression.toggleLeftParenthesis();
                                }, expression));
                            }
                        }
                        var parameter = expression.parameters["" + idx];
                        parameter.renderDom(parameter, parentDom);
                        if (parts[1] && (!(parameter instanceof BlankParameter))) {
                            dojo.place(cr("td", { class: "x-path-expression-part-etc index-" + idx }, parts[1].split('$')[0]), parentDom);
                        }
                    }
                    if (renderExpression[expression.expressionType].parameterCount === 0) {
                        expressionRead = cr("span", { class: "x-path-expression-part" }, renderExpression[expression.expressionType].xpathTemplate.replace("(", "").replace(")", ""));
                        var expressionWrite = newReadWriteWidget(guid, expressionRead, "set-expression", true);
                        var expressionTd = cr("td", { class: "x-path-expression-parts " + conditionClass_1() }, expressionWrite);
                        dojo.place(expressionTd, parentDom);
                        var valueId = dojoImports.expressionStore.query({ type: expression.expressionType })[0].id;
                        newSelectionAutoComplete("" + guid, dojo.hitch(expression, function (selectId, selectedExpression, value) {
                            if (value === "remove-expression") {
                                expression.getCondition().removeExpression(expression);
                            }
                            else {
                                var newValue = dojoImports.expressionStore.query({ id: value })[0].type;
                                expression.getCondition().setExpression(selectedExpression, newValue);
                            }
                        }, guid + "-selector", expression), valueId, expressionWrite, dojoImports.expressionStore, true);
                        if (hasParenthesis) {
                            var leftParButton = cr("td", { class: "left-parenthesis " + conditionClass_1() + " " + (expression.getLeftParenthesis() ? 'selected' : '') }, ' (');
                            dojo.place(leftParButton, parentDom);
                            dojoOn(leftParButton, 'click', dojo.hitch(_this, function (selectedExpression, evt) {
                                selectedExpression.toggleLeftParenthesis();
                            }, expression));
                        }
                    }
                    if (hasParenthesis) {
                        var rightParButton = cr("td", { class: "right-parenthesis " + conditionClass_1() + " " + (expression.getRightParenthesis() ? 'selected' : '') }, ') ');
                        dojo.place(rightParButton, parentDom);
                        dojoOn(rightParButton, 'click', dojo.hitch(_this, function (selectedExpression, evt) {
                            selectedExpression.toggleRightParenthesis();
                        }, expression));
                    }
                    expressionClassValue_1 = expressionClassValue_1.replace(' ' + highlightGuid, '');
                };
                var getPreviousExpressionEnums_1 = function (parameter) {
                    // If the previous parameter was an enum, add it's values to this parameter
                    var enumerationValues = [];
                    if ((parameter instanceof XPathAttribute) && (parameter.getParent() instanceof XPathEntity)) {
                        var attribute = parameter;
                        var xpathEntity = attribute.getParent();
                        if (!xpathEntity) {
                            return [];
                        }
                        if (attribute.getDataType() === DataType.Enum) {
                            enumerationValues = xpathEntity.getEntity().mxEntity.getEnumMap(attribute.attribute.qualifiedName);
                        }
                    }
                    else {
                        var expressionIndex = parameter.getParent().myIndex();
                        var xpathEntity = parameter.getParent().getXPathEntity();
                        var condition = parameter.getParent().getCondition();
                        if (expressionIndex > 0) {
                            var previousExpression = condition.expressions[expressionIndex - 1];
                            if (previousExpression.parameters[0] instanceof XPathAttribute) {
                                var attribute = previousExpression.parameters[0];
                                if (attribute.getDataType() === DataType.Enum) {
                                    var enumerations = xpathEntity.getEntity().mxEntity.getEnumMap(attribute.attribute.qualifiedName);
                                    enumerationValues = enumerations;
                                }
                            }
                            else if (previousExpression.parameters[0] instanceof XPathAssociation) {
                                var attribute = previousExpression.parameters[0].getAttributeAtTheEnd();
                                if (attribute && (attribute.getDataType() === DataType.Enum)) {
                                    enumerationValues = previousExpression.parameters[0].entity.getEntity().mxEntity.getEnumMap(attribute.attribute.qualifiedName);
                                }
                            }
                        }
                    }
                    enumerationValues.sort(function (a, b) {
                        a = (a.caption + '').toString();
                        b = (b.caption + '').toString();
                        if (a > b) {
                            return 1;
                        }
                        if (a < b) {
                            return -1;
                        }
                        return 0;
                    });
                    return enumerationValues;
                };
                var renderParameter_1 = function (parameter, parentDom, parameterDom, guid, parameterWrite) {
                    var xPathEntity = parameter.getEntityOwner();
                    dojo.place(parameterDom, parentDom);
                    var parent = parameter.getParent();
                    var selectedValue = parameter.plainValue();
                    if (parameter instanceof XPathAttribute) {
                        selectedValue = parameter.attribute.qualifiedName;
                    }
                    else if (parameter instanceof XPathAssociation) {
                        selectedValue = parameter.getAssociation().qualifiedName;
                    }
                    else if (parameter instanceof LiteralParameter) {
                        selectedValue = "LiteralParameter";
                    }
                    else if (parameter instanceof EnumParameter) {
                        var enumParameter = parameter;
                        selectedValue = enumParameter.value;
                    }
                    var parameters = dojoImports.getParameterPossibilities(xPathEntity, getPreviousExpressionEnums_1(parameter));
                    newSelection("" + guid, dojo.hitch(parameter, function (selectId, parameterSelected, parentSelected, allParameters, evt) {
                        var selection = allParameters.query({ id: evt })[0];
                        if (parentSelected instanceof Expression) {
                            var expressionSelected = parentSelected;
                            if (selection.type === "EmptyParameter") {
                                expressionSelected.setEmptyParameter(parameterSelected);
                            }
                            else if (selection.type === "RenderToken") {
                                expressionSelected.setTokenParameter(parameterSelected, evt);
                            }
                            else if (selection.type === "XPathAttribute") {
                                expressionSelected.setAttributeParameter(parameterSelected, evt);
                            }
                            else if (selection.type === "XPathAssociation") {
                                expressionSelected.setAssociationParameter(parameterSelected, evt);
                            }
                            else if (selection.type === "LiteralParameter") {
                                expressionSelected.setLiteralParameter(parameterSelected, "");
                            }
                            else if (selection.type === "EnumParameter") {
                                expressionSelected.setEnumParameter(parameterSelected, selection.id);
                            }
                            else if (selection.type === "BlankParameter") {
                                expressionSelected.setBlankParameter(parameterSelected);
                            }
                            else {
                                console.log("Bloop!");
                            }
                        }
                        else if (parentSelected instanceof XPathEntity) {
                            var xPathEntityParent = parentSelected;
                            xPathEntityParent.useMember(evt);
                        }
                    }, guid + "-selector", parameter, parent, parameters), dojo.hitch(_this, function (selectId, parameterSelected, parentSelected) {
                        var expressionSelected = parentSelected;
                        var widget = dijit.byId(selectId);
                        var inputValue = widget.domNode.querySelectorAll('input')[2].value;
                        expressionSelected.setLiteralParameter(parameterSelected, inputValue);
                    }, guid + "-selector", parameter, parent), selectedValue, parameterWrite, parameters, false);
                };
                // BlankParameter
                BlankParameter.prototype.renderDom = function (blankParameter, parentDom) {
                    var guid = blankParameter.id;
                    var blankParameterRead = cr("span", { class: "x-path-parameter blank-parameter" }, "?");
                    var blankParameterWrite = newReadWriteWidget(guid, blankParameterRead, "blank-parameter", true);
                    var blankDom = cr("td", { class: "empty-parameter-td " + conditionClass_1() }, blankParameterWrite);
                    renderParameter_1(blankParameter, parentDom, blankDom, guid, blankParameterWrite);
                };
                // EmptyParameter
                EmptyParameter.prototype.renderDom = function (emptyParameter, parentDom) {
                    var guid = emptyParameter.id;
                    var emptyParameterRead = cr("span", { class: "x-path-parameter empty-parameter" }, "empty");
                    var emptyParameterWrite = newReadWriteWidget(guid, emptyParameterRead, "empty-parameter", true);
                    var emptyDom = cr("td", { class: "empty-parameter-td " + conditionClass_1() }, emptyParameterWrite);
                    renderParameter_1(emptyParameter, parentDom, emptyDom, guid, emptyParameterWrite);
                };
                // XPathAttribute
                XPathAttribute.prototype.renderDom = function (xPathAttribute, parentDom) {
                    var guid = xPathAttribute.id;
                    var xPathAttributeRead = cr("span", { class: "x-path-parameter attribute-parameter" }, xPathAttribute.plainValue().replace('/', ''));
                    var xPathAttributeWrite = newReadWriteWidget(guid, xPathAttributeRead, "attribute-parameter", true);
                    var emptyDom = cr("td", { class: "attribute-parameter-td " + conditionClass_1() }, xPathAttributeWrite);
                    renderParameter_1(xPathAttribute, parentDom, emptyDom, guid, xPathAttributeWrite);
                };
                // XPathAssociation
                XPathAssociation.prototype.renderDom = function (xPathAssociation, parentDom) {
                    var guid = xPathAssociation.id;
                    var module = xPathAssociation.plainValue().split('.')[0];
                    var associationName = xPathAssociation.plainValue().split('.')[1].split('/')[0];
                    var xPathAssociationRead = cr("span", { class: "x-path-parameter association-parameter", title: xPathAssociation.associationName }, associationName);
                    var xPathAssociationWrite = newReadWriteWidget(guid, xPathAssociationRead, "association-parameter", true);
                    var emptyDom = cr("td", { class: "association-parameter-td " + conditionClass_1() }, xPathAssociationWrite);
                    renderParameter_1(xPathAssociation, parentDom, emptyDom, guid, xPathAssociationWrite);
                    if (!xPathAssociation.usingEntity()) {
                        var continuePath = cr("td", { class: "continue-path" }, '/…');
                        dojo.place(continuePath, parentDom);
                        dojoOn(continuePath, 'click', dojo.hitch(_this, function (associationSelected, event) {
                            associationSelected.useEntity();
                        }, xPathAssociation));
                    }
                    else {
                        var continuePath = cr("td", { class: "remove-path " + conditionClass_1() }, '/');
                        dojo.place(continuePath, parentDom);
                        dojoOn(continuePath, 'click', dojo.hitch(_this, function (associationSelected, event) {
                            associationSelected.discardEntity();
                        }, xPathAssociation));
                        xPathAssociation.entity.renderDom(xPathAssociation.entity, parentDom);
                    }
                };
                // RenderToken
                RenderToken.prototype.renderDom = function (renderToken, parentDom) {
                    var guid = renderToken.id;
                    var value = renderToken.plainValue().replace(/'/g, "").replace(/\[/g, "").replace(/\]/, "").replace(/%/g, "");
                    var renderTokenRead = cr("span", { class: "x-path-parameter token-parameter " + conditionClass_1() }, value);
                    var renderTokenWrite = newReadWriteWidget(guid, renderTokenRead, "token-parameter", true);
                    var tokenDom = cr("td", { class: "token-parameter-td" }, renderTokenWrite);
                    renderParameter_1(renderToken, parentDom, tokenDom, guid, renderTokenWrite);
                };
                // LiteralParameter.
                LiteralParameter.prototype.renderDom = function (literalParameter, parentDom) {
                    var guid = literalParameter.id;
                    var literalParameterRead = cr("span", { class: "x-path-parameter literal-parameter-edit" }, "\u25BC");
                    var literalParameterWrite = newReadWriteWidget(guid, literalParameterRead, "literal-parameter", true);
                    var literalDom = cr("td", { class: "literal-parameter-td " + conditionClass_1() }, literalParameterWrite);
                    renderParameter_1(literalParameter, parentDom, literalDom, guid, literalParameterWrite);
                    var inputRead = cr("span", { class: "literal-input-display " + literalParameter.getDataType() + " " + conditionClass_1() }, " " + literalParameter.renderXPath() + " ");
                    var inputWrite = newReadWriteWidget(guid + "-input", inputRead, "literal-input", true);
                    var input = inputWrite.querySelector('input');
                    var inputWriteTD = cr("td", { class: " " + conditionClass_1() }, inputWrite);
                    input.value = literalParameter.value;
                    input.type = "text";
                    input.className = "form-control";
                    dojo.place(inputWriteTD, parentDom);
                    var onChange = dojo.hitch(literalParameter, function (param, inputSelected, event) {
                        literalParameter.setValue(inputSelected.value);
                    }, literalParameter, input);
                    dojoOn(input, 'change', onChange);
                    var helper = new ReadWriteHelper(inputWrite.querySelector(".read-widget"), inputWrite.querySelector(".read-wrapper"), inputWrite.querySelector(".write-wrapper"), input, true, dijit.byId(guid + "-input-selector"));
                };
                // EnumParameter.
                EnumParameter.prototype.renderDom = function (enumParameter, parentDom) {
                    var guid = enumParameter.id;
                    var literalParameterRead = cr("span", { class: "x-path-parameter enum-parameter-edit" }, "\u25BC");
                    var literalParameterWrite = newReadWriteWidget(guid, literalParameterRead, "enum-parameter", true);
                    var literalDom = cr("td", { class: "token-parameter-td " + conditionClass_1() }, literalParameterWrite);
                    renderParameter_1(enumParameter, parentDom, literalDom, guid, literalParameterWrite);
                    var enums = getPreviousExpressionEnums_1(enumParameter);
                    var value = enumParameter.value;
                    enums.forEach(function (enum_) {
                        if (enum_.key === value) {
                            value = enum_.caption;
                        }
                    });
                    var inputRead = cr("span", { class: "enum-input-display " + enumParameter.getDataType() + " " + conditionClass_1() }, " " + value + " ");
                    var inputWrite = newReadWriteWidget(guid + "-input", inputRead, "enum-input", true);
                    var input = inputWrite.querySelector('input');
                    var inputWriteTD = cr("td", { class: " " + conditionClass_1() }, inputWrite);
                    input.value = enumParameter.value;
                    input.type = "text";
                    input.className = "form-control";
                    dojo.place(inputWriteTD, parentDom);
                    var onChange = dojo.hitch(enumParameter, function (param, inputSelected, event) {
                        enumParameter.setValue(inputSelected.value);
                    }, enumParameter, input);
                    dojoOn(input, 'change', onChange);
                    var helper = new ReadWriteHelper(inputWrite.querySelector(".read-widget"), inputWrite.querySelector(".read-wrapper"), inputWrite.querySelector(".write-wrapper"), input, true, dijit.byId(guid + "-input-selector"));
                };
            }
        },
        getParameterPossibilities: function (xpathEntity, enumParams) {
            if (enumParams === void 0) { enumParams = []; }
            var parameters = [];
            enumParams.forEach(function (enumParam) {
                parameters.push({ display: "<span class=\"expression-enum\" title=\"" + enumParam.key + "\">" + enumParam.caption + "</span>", name: enumParam.caption, id: enumParam.key, type: "EnumParameter" });
            });
            parameters.push({ display: '<span class="expression-empty"></span>', name: "", id: "Blank", type: "BlankParameter" });
            parameters.push({ display: '<span class="expression-empty">empty value</span>', name: "empty value", id: "empty", type: "EmptyParameter" });
            parameters.push({ display: '<span class="expression-literal">Variable</span>', name: "Variable", id: "Variable", type: "LiteralParameter" });
            xpathEntity.getEntity().attributeNames.forEach(function (member) {
                var memberName = member.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); });
                parameters.push({ display: "<span class=\"expression-attribute\">" + memberName + "</span>", name: memberName, id: member, type: "XPathAttribute" });
            });
            xpathEntity.getEntity().associationNames.forEach(function (member) {
                var module = member.split('.')[0].replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); }).replace("_", ' ');
                var association = domain.associations[member];
                var entity = association.otherEntity(xpathEntity.entityName);
                var associationName = member.split('.')[1].replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); }).replace("_", ' ');
                parameters.push({ display: "<span class=\"expression-association\">" + associationName + "</span> in " + module, name: associationName, id: member, type: "XPathAssociation", association: associationName, associationDisplay: "<span class=\"expression-association\">" + associationName + "</span>" });
            });
            xpathEntity.getEntity().associationNames.forEach(function (member) {
                var module = member.split('.')[0].replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); }).replace("_", ' ');
                var association = domain.associations[member];
                var entity = association.otherEntity(xpathEntity.entityName);
                var associationName = member.split('.')[1].replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); }).replace("_", ' ');
                parameters.push({ display: "<span class=\"expression-association\">" + associationName + "</span> in " + module, name: associationName, id: member, type: "XPathAssociation", association: associationName, associationDisplay: "<span class=\"expression-association\">" + associationName + "</span>" });
            });
            parameters.push({ display: '<span class="expression-token">Current Date Time</span>', name: "Current Date Time", id: "'[%CurrentDateTime%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">Begin Of Current Day</span>', name: "Begin Of Current Day", id: "'[%BeginOfCurrentDay%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">Begin Of Current Day UTC</span>', name: "Begin Of Current Day UTC", id: "'[%BeginOfCurrentDayUTC%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">Begin Of Current Hour</span>', name: "Begin Of Current Hour", id: "'[%BeginOfCurrentHour%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">Begin Of Current Hour UTC</span>', name: "Begin Of Current Hour UTC", id: "'[%BeginOfCurrentHourUTC%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">Begin Of Current Minute</span>', name: "Begin Of Current Minute", id: "'[%BeginOfCurrentMinute%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">Begin Of Current Minute UTC</span>', name: "Begin Of Current Minute UTC", id: "'[%BeginOfCurrentMinuteUTC%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">Begin Of Current Month</span>', name: "Begin Of Current Month", id: "'[%BeginOfCurrentMonth%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">Begin Of Current Month UTC</span>', name: "Begin Of Current Month UTC", id: "'[%BeginOfCurrentMonthUTC%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">Begin Of Current Week</span>', name: "Begin Of Current Week", id: "'[%BeginOfCurrentWeek%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">Begin Of Current Week UTC</span>', name: "Begin Of Current Week UTC", id: "'[%BeginOfCurrentWeekUTC%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">Begin Of Current Year</span>', name: "Begin Of Current Year", id: "'[%BeginOfCurrentYear%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">Begin Of Current Year UTC</span>', name: "Begin Of Current Year UTC", id: "'[%BeginOfCurrentYearUTC%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">End Of Current Day</span>', name: "End Of Current Day", id: "'[%EndOfCurrentDay%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">End Of Current Day UTC</span>', name: "End Of Current Day UTC", id: "'[%EndOfCurrentDayUTC%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">End Of Current Hour</span>', name: "End Of Current Hour", id: "'[%EndOfCurrentHour%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">End Of Current Hour UTC</span>', name: "End Of Current Hour UTC", id: "'[%EndOfCurrentHourUTC%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">End Of Current Minute</span>', name: "End Of Current Minute", id: "'[%EndOfCurrentMinute%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">End Of Current Minute UTC</span>', name: "End Of Current Minute UTC", id: "'[%EndOfCurrentMinuteUTC%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">End Of Current Month</span>', name: "End Of Current Month", id: "'[%EndOfCurrentMonth%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">End Of Current Month UTC</span>', name: "End Of Current Month UTC", id: "'[%EndOfCurrentMonthUTC%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">End Of Current Week</span>', name: "End Of Current Week", id: "'[%EndOfCurrentWeek%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">End Of Current Week UTC</span>', name: "End Of Current Week UTC", id: "'[%EndOfCurrentWeekUTC%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">End Of Current Year</span>', name: "End Of Current Year", id: "'[%EndOfCurrentYear%]'", type: "RenderToken" });
            parameters.push({ display: '<span class="expression-token">End Of Current Year UTC</span>', name: "End Of Current Year UTC", id: "'[%EndOfCurrentYearUTC%]'", type: "RenderToken" });
            return new Memory({ data: parameters });
        }
    };
    var ReadWriteHelper = /** @class */ (function () {
        function ReadWriteHelper(readWidget, readWrapper, writeWrapper, writeFocus, hideRead, selector) {
            var _this = this;
            this.readWidget = readWidget;
            this.readWrapper = readWrapper;
            this.writeWrapper = writeWrapper;
            this.writeFocus = writeFocus;
            this.hideRead = hideRead;
            this.selector = selector;
            this.writeDisplay = dojoStyle.get(writeWrapper, "display");
            this.readDisplay = dojoStyle.get(readWrapper, "display");
            this.events = [];
            this.read();
            this.events.push(dojoOn(writeFocus, "change", dojo.hitch(this, function (event) {
                _this.read();
            })));
            this.events.push(dojoOn(writeFocus, "blur", dojo.hitch(this, function (event) {
                setTimeout(function () {
                    _this.read();
                }, 400);
            })));
            this.events.push(dojoOn(readWidget, "click", dojo.hitch(this, function (event) {
                _this.write();
                _this.writeFocus.focus();
                _this.writeFocus.select();
                try {
                    _this.selector.openDropDown();
                }
                catch (e) {
                    //
                }
            })));
        }
        ReadWriteHelper.prototype.read = function () {
            dojoStyle.set(this.writeWrapper, "display", "none");
            dojoStyle.set(this.readWrapper, "display", this.readDisplay);
        };
        ReadWriteHelper.prototype.write = function () {
            dojoStyle.set(this.writeWrapper, "display", this.writeDisplay);
            if (this.hideRead) {
                dojoStyle.set(this.readWrapper, "display", "none");
            }
        };
        ReadWriteHelper.prototype.destroy = function () {
            this.events.forEach(function (event) {
                dojo.disconnect(event);
            });
        };
        return ReadWriteHelper;
    }());
    var getEntityMemoryList = function () {
        var friendlyEntityNames = [];
        var colourMap = {};
        var colourIndex = 0;
        var line = false;
        domain.entityNames.forEach(function (qualifiedName) {
            var moduleName = qualifiedName.split('.')[0];
            var entityName = qualifiedName.split('.')[1];
            if (!colourMap[moduleName]) {
                colourIndex += 1;
                colourMap[moduleName] = "color-" + colourIndex;
                line = true;
            }
            friendlyEntityNames.push({ name: entityName + " - " + moduleName, id: qualifiedName, display: "<div class=\"\">" + entityName + "<span style=\"float: right; font-weight: bold;\" class=\"" + colourMap[moduleName] + "\">" + moduleName + "</span></div>" });
            line = false;
        });
        return new Memory({ data: friendlyEntityNames });
    };
    var generateNewGuid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
    var cr = mxui.dom.create;
    // Constructs the path Element of an XPath entity
    var newReadWriteWidget = function (guid, readDom, widgetClass, clickable) {
        // const guid: string = generateNewGuid();
        var read = cr("span", { class: widgetClass + " read-widget", id: guid + "-read" }, readDom);
        var write = cr("input", { class: widgetClass + " write-widget", id: guid + "-write" });
        var readWrapper = cr("span", { class: widgetClass + " read-wrapper" }, read);
        var writeWrapper = cr("span", { class: widgetClass + " write-wrapper" }, write);
        var container = cr("span", { class: widgetClass + " rw-container", id: guid }, readWrapper, writeWrapper);
        container.setAttribute('clickable', clickable);
        return container;
    };
    var memberStore = function (xPathEntity) {
        var friendlyNames = [];
        var entity = xPathEntity.getEntity();
        entity.attributeNames.sort().forEach(function (attributeName) {
            var attribute = entity.attributes[attributeName];
            friendlyNames.push({ name: attributeName, id: attributeName, display: "<span title=\"" + attribute.dataType + "\" class=\"attribute-name-list\">" + attributeName + "</span><span class=\"data-type-list " + attribute.dataType + "\">" + attribute.dataType + "</span>" });
        });
        entity.associationNames.sort().forEach(function (associationName) {
            var association = entity.getAssociation(associationName);
            friendlyNames.push({
                display: "<span title=\"" + association.otherEntity(entity.qualifiedName) + "\" class=\"association-name-list\">" + associationName.split('.')[1] + "</span><span class=\"association-list\">" + association.otherEntity(entity.qualifiedName).split('.')[1] + "</span>",
                id: associationName,
                name: associationName
            });
        });
        friendlyNames.push({
            display: "<span title=\"Remove entity\" class=\"association-name-list\">~no selection~</span><span class=\"association-list\">remove</span>",
            id: "remove-selection",
            name: "remove-selection"
        });
        return new Memory({ data: friendlyNames });
    };
    var newSelection = function (elementId, callback, errorCallback, selectValue, domSelection, valueStore, hideRead) {
        console.log("selectValue = " + selectValue);
        var oldWidget = dijit.byId(elementId + "-selector");
        if (oldWidget) {
            oldWidget.destroy();
        }
        new FilteringSelect({
            autoComplete: false,
            class: "form-control inline-dropdown ",
            id: elementId + "-selector",
            invalidMessage: "Invalid selection. Will use literal value instead",
            labelAttr: "display",
            labelType: "html",
            name: elementId + "-selector",
            onBlur: dojo.hitch(_this, function (id) {
                var widget = dijit.byId(id);
                if (widget.state === "Error") {
                    errorCallback();
                }
            }, elementId + "-selector"),
            onChange: callback,
            onKeyPress: dojo.hitch(_this, function (event) {
                console.log("event=" + event);
            }),
            onSearch: dojo.hitch(_this, function (results, query, options) {
                console.log("results=" + results);
                console.log("query=" + query);
                console.log("options=" + options);
            }),
            onShow: dojo.hitch(_this, function (id, evt) {
                console.log("SHOW");
            }, elementId + "-selector"),
            queryExpr: '*\${0}*',
            required: false,
            searchAttr: "name",
            store: valueStore,
            style: "position: absolute;",
            value: selectValue
        }, elementId + "-write").startup();
        return new ReadWriteHelper(domSelection.querySelector(".read-widget"), domSelection.querySelector(".read-wrapper"), domSelection.querySelector(".write-wrapper"), dijit.byId(elementId + "-selector").domNode.querySelector(".dijitInputInner"), hideRead, dijit.byId(elementId + "-selector"));
    };
    var newSelectionAutoComplete = function (elementId, callback, selectValue, domSelection, valueStore, hideRead) {
        console.log("selectValue = " + selectValue);
        var oldWidget = dijit.byId(elementId + "-selector");
        if (oldWidget) {
            oldWidget.destroy();
        }
        new FilteringSelect({
            autoComplete: true,
            class: "form-control inline-dropdown ",
            id: elementId + "-selector",
            labelAttr: "display",
            labelType: "html",
            name: elementId + "-selector",
            onChange: callback,
            onSearch: dojo.hitch(_this, function (id, evt) {
                console.log("earch " + id);
            }, elementId + "-selector"),
            required: false,
            searchAttr: "name",
            store: valueStore,
            style: "position: absolute;",
            value: selectValue
        }, elementId + "-write").startup();
        return new ReadWriteHelper(domSelection.querySelector(".read-widget"), domSelection.querySelector(".read-wrapper"), domSelection.querySelector(".write-wrapper"), dijit.byId(elementId + "-selector").domNode.querySelector(".dijitInputInner"), hideRead, dijit.byId(elementId + "-selector"));
    };
    dojoImports.init(getEntityMemoryList(), new Memory({ data: getFriendlyRenderExpression() }));
    // Declare widget's prototype.
    return declare("XPath.widget.XPath", [_WidgetBase, _TemplatedMixin], {
        _alertDiv: null,
        _contextObj: null,
        _handles: null,
        _readOnly: false,
        entityQualifiedNameAttribute: "",
        filteringSelect: null,
        identitySelect: "entitySelect",
        jsonAttribute: "",
        templateString: widgetTemplate,
        xConstructor: xConstructor(),
        xPathAttribute: null,
        xPathWrapperNode: null,
        xpath: null,
        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            this._handles = [];
            this._xpathEntities = {};
            this.idCounter = 0;
        },
        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            if (this.readOnly || this.get("disabled") || this.readonly) {
                this._readOnly = true;
            }
            this._updateRendering();
            this._setupEvents();
        },
        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data
        update: function (obj, callback) {
            var _this = this;
            if (obj !== null) {
                try {
                    this.xpath = XPath.deserialize(obj.get(this.jsonAttribute));
                }
                catch (e) {
                    console.error(e);
                    this.xpath = new XPath();
                }
                this.xpath.events().addListener("update", dojo.hitch(this, function () {
                    // this._updateRendering();
                    _this._contextObj.set(_this.jsonAttribute, _this.xpath.serialize());
                    try {
                        _this._contextObj.set(_this.xPathAttribute, _this.xpath.renderXPath());
                    }
                    catch (e) {
                        _this._contextObj.set(_this.xPathAttribute, e.toString());
                    }
                    _this._updateRendering();
                }));
            }
            this.nodes = [];
            this._contextObj = obj;
            this._resetSubscriptions();
            this._updateRendering(callback); //  We're passing the callback to updateRendering to be called after DOM-manipulation
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
        // We want to stop events on a mobile device.
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
            // this.colorSelectNode.disabled = this._readOnly;
            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");
                dojo.empty(this.domNode);
                this.xpath.renderDom(this.xpath, this.domNode);
            }
            else {
                dojoStyle.set(this.domNode, "display", "none");
            }
            // Important to clear all validations!
            this._clearValidations();
            // The callback, coming from update, needs to be executed, to let the page know it finished rendering
            this._executeCallback(callback, "_updateRendering");
        },
        setExpression: function (addExpressionDom, expressionIndex) {
            if (expressionIndex === void 0) { expressionIndex = null; }
            var addExpressionDomId = addExpressionDom.id;
            var entityId = addExpressionDom.getAttribute("entityId");
            var xpathEntity = this._xpathEntities[entityId];
            var condition = xpathEntity.conditions[parseInt(addExpressionDom.getAttribute("condition"), 10)];
            var useAdd = true;
            var defaultValue = '';
            var parameterIndex = 0;
            if (expressionIndex === null) {
                expressionIndex = parseInt(addExpressionDom.getAttribute("expression"), 10);
                parameterIndex = parseInt(addExpressionDom.getAttribute("parameter"), 10);
                defaultValue = condition.expressions[expressionIndex].parameters[parameterIndex].plainValue();
                useAdd = false;
            }
            var paramPossibilities = dojoImports.getParameterPossibilities(xpathEntity, this.getPreviousExpressionEnums(condition.expressions[expressionIndex].parameters[parameterIndex]));
            newSelection(addExpressionDomId, dojo.hitch(this, function (id, selectedCondition, parameterStore, changedTo) {
                console.log("changedTo = " + changedTo);
                var selectedItem = parameterStore.query({ id: changedTo })[0];
                var expression = useAdd ? selectedCondition.addExpression() : condition.expressions[expressionIndex];
                if (selectedItem.type === 'EmptyParameter') {
                    expression.setEmptyParameter(parameterIndex);
                }
                else if (selectedItem.type === 'RenderToken') {
                    expression.setTokenParameter(parameterIndex, changedTo);
                }
                else if (selectedItem.type === 'XPathAttribute') {
                    expression.setAttributeParameter(parameterIndex, changedTo);
                }
                else if (selectedItem.type === 'XPathAssociation') {
                    var association = changedTo.split('/')[0];
                    var entity = !!changedTo.split('/')[1];
                    var parameter = expression.setAssociationParameter(parameterIndex, association);
                    if (entity) {
                        var useEntity = parameter.useEntity();
                    }
                }
                else {
                    throw new Error("Unsupported 2.");
                }
            }, addExpressionDomId + "-selector", condition, paramPossibilities), dojo.hitch(this, function () {
                //
            }), defaultValue, addExpressionDom, paramPossibilities, true);
        },
        // Handle validations.
        _handleValidation: function (validations) {
            console.log(this.id + "._handleValidation");
            this._clearValidations();
        },
        // Clear validations.
        _clearValidations: function () {
            dojoConstruct.destroy(this._alertDiv);
            this._alertDiv = null;
        },
        // Show an error message
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
            console.log(this.id + "._resetSubscriptions!");
            // Release handles on previous object, if any
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
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});
require(["XPath/widget/XPath"]);
