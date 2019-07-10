var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function functionName(fun) {
    /* Used for finding the right class name for an object
    for the purpose of serializing it to JSON and the using the classname
    to instantiate the correct class */
    var ret = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
}
// Generic Data Type Enumeration.
var DataType;
(function (DataType) {
    DataType["String"] = "String";
    DataType["HashString"] = "HashString";
    DataType["Boolean"] = "Boolean";
    DataType["Currency"] = "Currency";
    DataType["DateTime"] = "DateTime";
    DataType["Enum"] = "Enum";
    DataType["Integer"] = "Integer";
    DataType["AutoNumber"] = "AutoNumber";
    DataType["BigDecimal"] = "BigDecimal";
    DataType["Decimal"] = "Decimal";
    DataType["Long"] = "Long";
    DataType["Numeric"] = "Numeric";
    DataType["Float"] = "Float";
    DataType["Binary"] = "Binary";
    DataType["Association"] = "Association";
    DataType["Entity"] = "Entity";
    DataType["CheckExpression"] = "CheckExpression";
    DataType["List"] = "List";
    DataType["Empty"] = "Empty";
    DataType["Unknown"] = "Unknown";
    DataType["Blank"] = "Blank";
})(DataType || (DataType = {}));
// Date-time tokens.
var Token;
(function (Token) {
    Token["CurrentDateTime"] = "'[%CurrentDateTime%]'";
    Token["BeginOfCurrentDay"] = "'[%BeginOfCurrentDay%]'";
    Token["BeginOfCurrentDayUTC"] = "'[%BeginOfCurrentDayUTC%]'";
    Token["BeginOfCurrentHour"] = "'[%BeginOfCurrentHour%]'";
    Token["BeginOfCurrentHourUTC"] = "'[%BeginOfCurrentHourUTC%]'";
    Token["BeginOfCurrentMinute"] = "'[%BeginOfCurrentMinute%]'";
    Token["BeginOfCurrentMinuteUTC"] = "'[%BeginOfCurrentMinuteUTC%]'";
    Token["BeginOfCurrentMonth"] = "'[%BeginOfCurrentMonth%]'";
    Token["BeginOfCurrentMonthUTC"] = "'[%BeginOfCurrentMonthUTC%]'";
    Token["BeginOfCurrentWeek"] = "'[%BeginOfCurrentWeek%]'";
    Token["BeginOfCurrentWeekUTC"] = "'[%BeginOfCurrentWeekUTC%]'";
    Token["BeginOfCurrentYear"] = "'[%BeginOfCurrentYear%]'";
    Token["BeginOfCurrentYearUTC"] = "'[%BeginOfCurrentYearUTC%]'";
    Token["EndOfCurrentDay"] = "'[%EndOfCurrentDay%]'";
    Token["EndOfCurrentDayUTC"] = "'[%EndOfCurrentDayUTC%]'";
    Token["EndOfCurrentHour"] = "'[%EndOfCurrentHour%]'";
    Token["EndOfCurrentHourUTC"] = "'[%EndOfCurrentHourUTC%]'";
    Token["EndOfCurrentMinute"] = "'[%EndOfCurrentMinute%]'";
    Token["EndOfCurrentMinuteUTC"] = "'[%EndOfCurrentMinuteUTC%]'";
    Token["EndOfCurrentMonth"] = "'[%EndOfCurrentMonth%]'";
    Token["EndOfCurrentMonthUTC"] = "'[%EndOfCurrentMonthUTC%]'";
    Token["EndOfCurrentWeek"] = "'[%EndOfCurrentWeek%]'";
    Token["EndOfCurrentWeekUTC"] = "'[%EndOfCurrentWeekUTC%]'";
    Token["EndOfCurrentYear"] = "'[%EndOfCurrentYear%]'";
    Token["EndOfCurrentYearUTC"] = "'[%EndOfCurrentYearUTC%]'";
})(Token || (Token = {}));
var ExpressionType;
(function (ExpressionType) {
    ExpressionType["None"] = "None";
    ExpressionType["Comma"] = "Comma";
    ExpressionType["NotEquals"] = "Not Equals";
    ExpressionType["LessThan"] = "Less Than";
    ExpressionType["LessOrEqualThan"] = "Less Or Equal Than";
    ExpressionType["Equals"] = "Equals";
    ExpressionType["GreaterThan"] = "Greater Than";
    ExpressionType["GreaterOrEqualThan"] = "Greater Or Equal Than";
    ExpressionType["And"] = "And";
    ExpressionType["Contains"] = "Contains";
    ExpressionType["DayFromDateTime"] = "Day From Date Time";
    ExpressionType["DayOfYearFromDateTime"] = "Day Of Year From Date Time";
    ExpressionType["EndsWith"] = "Ends With";
    ExpressionType["False"] = "False";
    ExpressionType["HoursFromDateTime"] = "Hours From Date Time";
    ExpressionType["Length"] = "Length";
    ExpressionType["MinutesFromDateTime"] = "Minutes From Date Time";
    ExpressionType["MonthsFromDateTime"] = "Months From Date Time";
    ExpressionType["Not"] = "Not";
    ExpressionType["HasNoEntity"] = "Has No Entity";
    ExpressionType["Or"] = "Or";
    ExpressionType["QuarterFromDateTime"] = "Quarter From Date Time";
    ExpressionType["Reversed"] = "Reversed";
    ExpressionType["SecondsFromDateTime"] = "Seconds From Date Time";
    ExpressionType["StartsWith"] = "StartsWith";
    ExpressionType["StringLength"] = "String Length";
    ExpressionType["True"] = "True";
    ExpressionType["WeekFromDateTime"] = "Week From Date Time";
    ExpressionType["WeekDayFromDateTime"] = "Weekday From Date Time";
    ExpressionType["YearFromDateTime"] = "Year From Date Time";
})(ExpressionType || (ExpressionType = {}));
/*
    A DataItem is any artefact that belongs in the Domain Model of Mendix, like Entities, Associations and attributes
*/
var DataItem = /** @class */ (function () {
    function DataItem(qualifiedName, object) {
        this.qualifiedName = qualifiedName;
        this.module = qualifiedName.split('.')[0];
        this.name = qualifiedName.split('.').reverse()[0];
        if (object) {
            this.setup(object);
        }
    }
    return DataItem;
}());
/*
    Entity Members are Assiciations and Attributes
*/
var Member = /** @class */ (function (_super) {
    __extends(Member, _super);
    function Member() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Member;
}(DataItem));
var Attribute = /** @class */ (function (_super) {
    __extends(Attribute, _super);
    function Attribute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attribute.prototype.setup = function (entity) {
        this.module = entity.qualifiedName.split('.')[0];
        this.dataType = DataType[entity.mxEntity.getAttributeType(this.qualifiedName)];
    };
    return Attribute;
}(Member));
var Association = /** @class */ (function (_super) {
    __extends(Association, _super);
    function Association() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Association.newAssociation = function (assoicationName, parent) {
        return new Association(assoicationName, parent);
    };
    // private entityTo: Entity[];
    Association.prototype.setup = function (entity) {
        this.entityFrom = entity;
    };
    Association.prototype.otherEntity = function (entityName) {
        var entityTo = [this.entityFrom.mxEntity.getSelectorEntity(this.qualifiedName)];
        mx.meta.getEntity(entityName).getSuperEntities().forEach(function (sub) {
            entityTo.push(sub);
        });
        if (entityTo.indexOf(entityName) > -1) {
            return this.entityFrom.qualifiedName;
        }
        else {
            return entityTo[0];
        }
    };
    return Association;
}(Member));
var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Entity.prototype.setup = function (entity) {
        var _this = this;
        this.memberNames = [];
        this.mxEntity = entity;
        this.attributes = {};
        this.attributeNames = [];
        entity.getAttributesWithoutReferences().forEach(function (attributeName) {
            var attribute = new Attribute(attributeName, _this);
            _this.attributes[attributeName] = attribute;
            _this.attributeNames.push(attributeName);
            _this.memberNames.push(attributeName);
        });
        this._associations = {};
        this.associationNames = [];
        entity.getReferenceAttributes().forEach(function (associationName) {
            _this.addAssociation(associationName);
        });
    };
    Entity.prototype.addAssociation = function (association) {
        var associationName = association instanceof Association ? association.qualifiedName : association;
        if (this.associationNames.indexOf(associationName) === -1) {
            this._associations[associationName] = association instanceof Association ? association : Association.newAssociation(associationName, this);
            this.associationNames.push(associationName);
            this.memberNames.push(associationName);
        }
    };
    Entity.prototype.getAssociation = function (associationName) {
        return this._associations[associationName];
    };
    Entity.prototype.memberIsAttribute = function (memberName) {
        if (this.memberNames.indexOf(memberName) === -1) {
            throw new Error("Invalid member " + memberName);
        }
        else {
            return this.attributeNames.indexOf(memberName) > -1;
        }
    };
    return Entity;
}(DataItem));
var DomainModel = /** @class */ (function () {
    function DomainModel() {
        var _this = this;
        this.entities = {};
        this.entityNames = [];
        this.associationNames = [];
        this.associations = {};
        var associationNames = [];
        Object.keys(mx.meta.getMap()).sort().forEach(function (entityName) {
            var mxEntity = mx.meta.getEntity(entityName);
            if (!mxEntity.isPersistable || mxEntity.isPersistable()) {
                var entity_1 = new Entity(entityName, mxEntity);
                _this.entities[entityName] = entity_1;
                _this.entityNames.push(entityName);
                entity_1.associationNames.forEach(function (associationName) {
                    var association = entity_1.getAssociation(associationName);
                    _this.associations[association.qualifiedName] = association;
                    associationNames.push(association);
                });
                mxEntity.getSuperEntities().forEach(function (name) {
                    var superEntity = new Entity(name, mx.meta.getEntity(name));
                    superEntity.associationNames.forEach(function (associationName) {
                        var association = entity_1.getAssociation(associationName);
                        associationNames.push(association);
                    });
                });
            }
        });
        var loggedWarning = [];
        associationNames.forEach(function (association) {
            var associationName = association.qualifiedName;
            var entityToName = association.entityFrom.mxEntity.getSelectorEntity(association.qualifiedName);
            // association.entityTo = this.entities[entityToName];
            try {
                var entity = _this.entities[entityToName];
                entity.addAssociation(association);
                _this.associationNames.push(associationName);
                // entity.mxEntity.getSubEntities().forEach((subName: string) => {
                //     const subEntity: Entity = this.entities[subName];
                //     entity.addAssociation(association);
                // });
                // association.entityTo.addAssociation(associationName);
            }
            catch (e) {
                if (loggedWarning.indexOf("You are not allowed to view " + associationName) === -1) {
                    console.warn("You are not allowed to view " + associationName);
                    loggedWarning.push("You are not allowed to view " + associationName);
                }
            }
            // association.entityFrom.mxEntity
        });
        associationNames.forEach(function (association) {
            var entityToName = association.entityFrom.mxEntity.getSelectorEntity(association.qualifiedName);
            var entity = _this.entities[entityToName];
            if (entity && entity.mxEntity)
                entity.mxEntity.getSubEntities().forEach(function (subName) {
                    var subEntity = _this.entities[subName];
                    subEntity.addAssociation(association);
                });
        });
    }
    return DomainModel;
}());
var domain = new DomainModel();
/*
    End of Domain Layer.
*/
/*
    Start of XPath Controller Objects.
*/
var EventListener = /** @class */ (function () {
    function EventListener() {
        this.eventListeners = [];
    }
    EventListener.prototype.registerEvent = function (eventName) {
        var eventListener = { event: eventName, listeners: [] };
        this.eventListeners.push(eventListener);
        return eventListener;
    };
    EventListener.prototype.getEventListeners = function (eventName) {
        var result;
        this.eventListeners.forEach(function (eventListener) {
            if (eventListener.event === eventName) {
                result = eventListener;
            }
        });
        if (!result) {
            return this.registerEvent(eventName);
        }
        else {
            return result;
        }
    };
    EventListener.prototype.addListener = function (eventName, listener) {
        this.getEventListeners(eventName).listeners.push(listener);
    };
    EventListener.prototype.on = function (eventName, args) {
        var _this = this;
        if (args === void 0) { args = []; }
        this.getEventListeners(eventName).listeners.forEach(function (listener) {
            listener.apply(_this, args);
        });
    };
    return EventListener;
}());
var newGuid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};
var Render = /** @class */ (function () {
    function Render(parent) {
        this.id = newGuid();
        this.setup(parent);
    }
    Render.prototype.events = function () {
        return null;
    };
    Render.prototype.getParent = function () {
        return null;
    };
    Render.prototype.getRoot = function () {
        var root = this;
        var child = root;
        while (root !== null) {
            child = root;
            root = root.getParent();
        }
        return child;
    };
    Render.prototype.setup = function (parent) {
        var events = new EventListener();
        this.getParent = function () {
            return parent;
        };
        this.events = function () {
            return events;
        };
        this.loadClass = functionName(this.__proto__.constructor);
        this.getParent = function () {
            return parent;
        };
    };
    Render.prototype.onUpdate = function () {
        var root = this.getRoot();
        root.events().on("update", [root, this]);
    };
    Render.prototype.renderDom = function (render, parentDom) {
        console.error("Implement me.");
    };
    return Render;
}());
var RenderParameter = /** @class */ (function (_super) {
    __extends(RenderParameter, _super);
    function RenderParameter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RenderParameter.prototype.getExpression = function () {
        return this.getParent();
    };
    RenderParameter.prototype.getEntityOwner = function () {
        var parent = this.getParent();
        while (!(parent instanceof XPathEntity)) {
            parent = parent.getParent();
        }
        return parent;
    };
    return RenderParameter;
}(Render));
var RenderToken = /** @class */ (function (_super) {
    __extends(RenderToken, _super);
    function RenderToken(parent, token) {
        var _this = _super.call(this, parent) || this;
        _this.token = token;
        return _this;
    }
    RenderToken.prototype.plainValue = function () {
        return this.token;
    };
    RenderToken.prototype.setup = function (parent) {
        _super.prototype.setup.call(this, parent);
    };
    RenderToken.prototype.renderXPath = function () {
        return this.token.toString();
    };
    RenderToken.prototype.getDataType = function () {
        return DataType.DateTime;
    };
    return RenderToken;
}(RenderParameter));
var ExpressionConfig = /** @class */ (function () {
    function ExpressionConfig(parameterCount, xpathTemplate, returnDataType, startWithParenthises) {
        this.parameterCount = parameterCount;
        this.xpathTemplate = xpathTemplate;
        this.returnDataType = returnDataType;
        this.startWithParenthises = startWithParenthises;
    }
    return ExpressionConfig;
}());
var RenderExpression = {};
RenderExpression[ExpressionType.None] = new ExpressionConfig(1, "$0", DataType.CheckExpression, false);
RenderExpression[ExpressionType.Comma] = new ExpressionConfig(0, ", ", DataType.Unknown, false);
RenderExpression[ExpressionType.And] = new ExpressionConfig(1, "and ($0)", DataType.Boolean, false);
RenderExpression[ExpressionType.Or] = new ExpressionConfig(1, "or ($0)", DataType.Boolean, false);
RenderExpression[ExpressionType.Equals] = new ExpressionConfig(1, "= ($0)", DataType.CheckExpression, false);
RenderExpression[ExpressionType.NotEquals] = new ExpressionConfig(1, "!= ($0)", DataType.CheckExpression, false);
RenderExpression[ExpressionType.Not] = new ExpressionConfig(1, "not($0)", DataType.Boolean, true);
RenderExpression[ExpressionType.HasNoEntity] = new ExpressionConfig(1, "not($0)", DataType.Entity, true);
RenderExpression[ExpressionType.Contains] = new ExpressionConfig(2, "contains($0, $1)", DataType.Boolean, true);
RenderExpression[ExpressionType.LessThan] = new ExpressionConfig(1, "< ($0)", DataType.CheckExpression, false);
RenderExpression[ExpressionType.LessOrEqualThan] = new ExpressionConfig(1, "<= ($0)", DataType.CheckExpression, false);
RenderExpression[ExpressionType.GreaterThan] = new ExpressionConfig(1, "> ($0)", DataType.CheckExpression, false);
RenderExpression[ExpressionType.GreaterOrEqualThan] = new ExpressionConfig(1, ">= ($0)", DataType.CheckExpression, false);
RenderExpression[ExpressionType.DayFromDateTime] = new ExpressionConfig(1, "day-from-dateTime($0)", DataType.Integer, true);
RenderExpression[ExpressionType.DayOfYearFromDateTime] = new ExpressionConfig(1, "day-of-year-from-dateTime($0)", DataType.Integer, true);
RenderExpression[ExpressionType.EndsWith] = new ExpressionConfig(1, "ends-with($0)", DataType.Boolean, true);
RenderExpression[ExpressionType.False] = new ExpressionConfig(0, "false()", DataType.Boolean, true);
RenderExpression[ExpressionType.HoursFromDateTime] = new ExpressionConfig(1, "hours-from-dateTime($0)", DataType.Integer, true);
RenderExpression[ExpressionType.Length] = new ExpressionConfig(1, "length($0)", DataType.Integer, true);
RenderExpression[ExpressionType.MinutesFromDateTime] = new ExpressionConfig(1, "minutes-from-dateTime($0)", DataType.Integer, true);
RenderExpression[ExpressionType.MonthsFromDateTime] = new ExpressionConfig(1, "months-from-dateTime($0)", DataType.Integer, true);
RenderExpression[ExpressionType.QuarterFromDateTime] = new ExpressionConfig(1, "quarter-from-dateTime($0)", DataType.Integer, true);
RenderExpression[ExpressionType.Reversed] = new ExpressionConfig(1, "reversed($0)", DataType.Association, true);
RenderExpression[ExpressionType.SecondsFromDateTime] = new ExpressionConfig(1, "seconds-from-dateTime($0)", DataType.Integer, true);
RenderExpression[ExpressionType.StartsWith] = new ExpressionConfig(2, "starts-with($0, $1)", DataType.Boolean, true);
RenderExpression[ExpressionType.StringLength] = new ExpressionConfig(1, "string-length($0)", DataType.Integer, true);
RenderExpression[ExpressionType.True] = new ExpressionConfig(0, "true()", DataType.Boolean, true);
RenderExpression[ExpressionType.WeekFromDateTime] = new ExpressionConfig(1, "week-from-dateTime($0)", DataType.Integer, true);
RenderExpression[ExpressionType.WeekDayFromDateTime] = new ExpressionConfig(1, "week-day-from-dateTime($0)", DataType.Integer, true);
RenderExpression[ExpressionType.YearFromDateTime] = new ExpressionConfig(1, "year-from-dateTime($0)", DataType.Integer, true);
var EmptyParameter = /** @class */ (function (_super) {
    __extends(EmptyParameter, _super);
    function EmptyParameter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmptyParameter.prototype.plainValue = function () {
        return 'empty';
    };
    EmptyParameter.prototype.renderXPath = function () {
        return "empty";
    };
    EmptyParameter.prototype.getDataType = function () {
        return DataType.Unknown;
    };
    return EmptyParameter;
}(RenderParameter));
var BlankParameter = /** @class */ (function (_super) {
    __extends(BlankParameter, _super);
    function BlankParameter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlankParameter.prototype.plainValue = function () {
        return '';
    };
    BlankParameter.prototype.renderXPath = function () {
        return "";
    };
    BlankParameter.prototype.getDataType = function () {
        return DataType.Blank;
    };
    return BlankParameter;
}(RenderParameter));
var Expression = /** @class */ (function (_super) {
    __extends(Expression, _super);
    function Expression(parent, expressionType) {
        if (expressionType === void 0) { expressionType = ExpressionType.None; }
        var _this = _super.call(this, parent) || this;
        _this.setExpressionType(expressionType);
        _this.leftParenthesis = RenderExpression[_this.expressionType].startWithParenthises;
        _this.rightParenthesis = RenderExpression[_this.expressionType].startWithParenthises;
        return _this;
    }
    Expression.prototype.plainValue = function () {
        return this.expressionType;
    };
    Expression.prototype.setup = function (parent) {
        _super.prototype.setup.call(this, parent);
    };
    Expression.prototype.getLeftParenthesis = function () {
        return this.leftParenthesis;
    };
    Expression.prototype.getRightParenthesis = function () {
        return this.rightParenthesis;
    };
    Expression.prototype.setLeftParenthesis = function (value) {
        this.leftParenthesis = value;
        this.onUpdate();
    };
    Expression.prototype.setRightParenthesis = function (value) {
        this.rightParenthesis = value;
        this.onUpdate();
    };
    Expression.prototype.myIndex = function () {
        var _this = this;
        if (this.getParent() instanceof Expression) {
            var expression_1 = this.getParent();
            Object.keys(expression_1.parameters).forEach(function (index) {
                if (expression_1 === _this) {
                    return index;
                }
            });
            return -1;
        }
        else if (this.getParent() instanceof Condition) {
            var condition = this.getParent();
            return condition.expressions.indexOf(this);
        }
    };
    Expression.prototype.parameterIndex = function (parameter) {
        var _this = this;
        var result = -1;
        Object.keys(this.parameters).forEach(function (index) {
            if (_this.parameters[index] === parameter) {
                result = parseInt(index, 10);
            }
        });
        return result;
    };
    Expression.prototype.firstExpression = function () {
        return this.myIndex() === 0;
    };
    Expression.prototype.getXPathEntity = function () {
        if (this.getParent() instanceof Expression) {
            var expression = this.getParent();
            return expression.getXPathEntity();
        }
        else if (this.getParent() instanceof Condition) {
            var condition = this.getParent();
            return condition.getParent();
        }
    };
    Expression.prototype.toggleLeftParenthesis = function () {
        this.leftParenthesis = !this.leftParenthesis;
        this.onUpdate();
        return this.leftParenthesis;
    };
    Expression.prototype.toggleRightParenthesis = function () {
        this.rightParenthesis = !this.rightParenthesis;
        this.onUpdate();
        return this.rightParenthesis;
    };
    Expression.prototype.setExpressionType = function (expressionType) {
        if ((this.parameters === null) || (this.parameters === undefined)) {
            this.parameters = [];
        }
        this.expressionType = expressionType;
        for (var idx = 0; idx < RenderExpression[expressionType].parameterCount; idx++) {
            if ((this.parameters[idx] === null) || (this.parameters[idx] === undefined)) {
                this.parameters[idx] = new EmptyParameter(this);
            }
        }
        var currentLength = Object.keys(this.parameters).length;
        for (var idx = RenderExpression[expressionType].parameterCount; idx < currentLength; idx++) {
            delete this.parameters[idx];
        }
        var hasParenthesis = RenderExpression[this.expressionType].xpathTemplate.indexOf('(') > -1;
        this.leftParenthesis = hasParenthesis;
        this.rightParenthesis = hasParenthesis;
        this.onUpdate();
    };
    Expression.prototype.setLiteralParameter = function (index, value) {
        if (index instanceof RenderParameter) {
            index = this.parameterIndex(index);
        }
        if (!this.parameters[index] === undefined) {
            throw new Error("Invalid parameter index " + index + " for expression " + this.expressionType);
        }
        this.parameters[index] = new LiteralParameter(this, value);
        this.onUpdate();
        return this.parameters[index];
    };
    Expression.prototype.setEnumParameter = function (index, value) {
        if (index instanceof RenderParameter) {
            index = this.parameterIndex(index);
        }
        if (!this.parameters[index] === undefined) {
            throw new Error("Invalid parameter index " + index + " for expression " + this.expressionType);
        }
        this.parameters[index] = new EnumParameter(this, value);
        this.onUpdate();
        return this.parameters[index];
    };
    Expression.prototype.setAttributeParameter = function (index, attributeName) {
        if (index instanceof RenderParameter) {
            index = this.parameterIndex(index);
        }
        if (this.getXPathEntity().getEntity().attributeNames.indexOf(attributeName) === -1) {
            throw new Error("Invalid attribute \"" + attributeName + "\" for entity \"" + this.getXPathEntity().entityName + "(" + this.getXPathEntity().getEntity().attributeNames + ")\"");
        }
        this.parameters[index] = new XPathAttribute(this, this.getXPathEntity().getEntity().attributes[attributeName], false);
        this.onUpdate();
        return this.parameters[index];
    };
    Expression.prototype.setAssociationParameter = function (index, associationName, useEntity) {
        if (useEntity === void 0) { useEntity = false; }
        if (index instanceof RenderParameter) {
            index = this.parameterIndex(index);
        }
        if (this.getXPathEntity().getEntity().associationNames.indexOf(associationName) === -1) {
            throw new Error("Invalid association \"" + associationName + "\" for entity \"" + this.getXPathEntity().entityName + "\"");
        }
        var newAssociation = new XPathAssociation(this, this.getXPathEntity().entityName, associationName, useEntity);
        this.parameters[index] = newAssociation;
        if (useEntity) {
            newAssociation.useEntity();
        }
        this.onUpdate();
        return this.parameters[index];
    };
    Expression.prototype.setTokenParameter = function (index, token) {
        if (index instanceof RenderParameter) {
            index = this.parameterIndex(index);
        }
        this.parameters[index] = new RenderToken(this, token);
        this.onUpdate();
        return this.parameters[index];
    };
    Expression.prototype.setEmptyParameter = function (index) {
        if (index instanceof RenderParameter) {
            index = this.parameterIndex(index);
        }
        this.parameters[index] = new EmptyParameter(this);
        this.onUpdate();
        return this.parameters[index];
    };
    Expression.prototype.setBlankParameter = function (index) {
        if (index instanceof RenderParameter) {
            index = this.parameterIndex(index);
        }
        this.parameters[index] = new BlankParameter(this);
        this.onUpdate();
        return this.parameters[index];
    };
    Expression.prototype.renderXPath = function () {
        var result = RenderExpression[this.expressionType].xpathTemplate.replace("(", this.leftParenthesis ? "(" : "").replace(")", this.rightParenthesis ? ")" : "");
        for (var idx = 0; idx < RenderExpression[this.expressionType].parameterCount; idx++) {
            result = result.replace("$" + idx, "" + this.parameters[idx].renderXPath());
        }
        return result;
    };
    Expression.prototype.getDataType = function () {
        if (RenderExpression[this.expressionType].returnDataType === DataType.CheckExpression) {
            return this.parameters[0].getDataType();
        }
        else {
            return RenderExpression[this.expressionType].returnDataType;
        }
    };
    Expression.prototype.getCondition = function () {
        // Uses getParent and casts as Condition
        return this.getParent();
    };
    return Expression;
}(RenderParameter));
var Condition = /** @class */ (function (_super) {
    __extends(Condition, _super);
    function Condition(xPathEntity) {
        var _this = _super.call(this, xPathEntity) || this;
        _this.expressions = [new Expression(_this)];
        return _this;
    }
    Condition.prototype.renderXPath = function () {
        var result = '';
        var firstExpressionDone = false;
        this.expressions.forEach(function (expression) {
            result += "" + (firstExpressionDone ? ' ' : '') + expression.renderXPath();
            firstExpressionDone = true;
        });
        return "[" + result + "]";
    };
    Condition.prototype.addExpression = function (expressionType) {
        if (expressionType === void 0) { expressionType = ExpressionType.None; }
        var expression = new Expression(this, expressionType);
        this.expressions.push(expression);
        this.onUpdate();
        return expression;
    };
    Condition.prototype.setExpression = function (index, expressionType) {
        if (index instanceof Expression) {
            index = index.myIndex();
        }
        this.expressions[index].setExpressionType(expressionType);
        return this.expressions[index];
    };
    Condition.prototype.removeExpression = function (expression) {
        var expressions = [];
        if (!(expression instanceof Expression)) {
            expression = this.expressions[expression];
        }
        this.expressions.forEach(function (loopExpression) {
            if (loopExpression !== expression) {
                expressions.push(loopExpression);
            }
        });
        this.expressions = expressions;
        this.onUpdate();
        return this.expressions;
    };
    Condition.prototype.insertExpression = function (index, expressionType) {
        if (expressionType === void 0) { expressionType = ExpressionType.None; }
        var expressions = [];
        for (var idx = 0; idx < index; idx++) {
            expressions.push(this.expressions[idx]);
        }
        var expression = new Expression(this, expressionType);
        expressions.push(expression);
        for (var idx = index; idx < this.expressions.length; idx++) {
            expressions.push(this.expressions[idx]);
        }
        this.expressions = expressions;
        this.onUpdate();
        return expression;
    };
    Condition.prototype.getDataType = function () {
        return DataType.Boolean;
    };
    Condition.prototype.getEntity = function () {
        return this.getParent();
    };
    Condition.prototype.myIndex = function () {
        // Get's Condition's index
        return this.getParent().conditions.indexOf(this);
    };
    return Condition;
}(Render));
var XPathMember = /** @class */ (function (_super) {
    __extends(XPathMember, _super);
    function XPathMember() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return XPathMember;
}(RenderParameter));
var LiteralParameter = /** @class */ (function (_super) {
    __extends(LiteralParameter, _super);
    function LiteralParameter(parent, value) {
        var _this = _super.call(this, parent) || this;
        _this.value = value;
        return _this;
    }
    LiteralParameter.prototype.plainValue = function () {
        return this.value.replace("''", "'");
    };
    LiteralParameter.prototype.getDataType = function () {
        var value = this.value;
        if ((value === undefined) || (value === null) || ((value + '').trim() === '')) {
            return DataType.Unknown;
        }
        else if (isNaN(value)) {
            return DataType.String;
        }
        else {
            if (parseFloat(this.value) !== parseInt(this.value, 10)) {
                return DataType.Decimal;
            }
            else {
                return DataType.Integer;
            }
        }
    };
    LiteralParameter.prototype.renderXPath = function () {
        var dataType = this.getDataType();
        if (dataType === DataType.String) {
            return ("'" + this.value + "'").replace(/''/g, "'");
        }
        else if ((dataType === DataType.Integer) || (dataType === DataType.Decimal)) {
            return this.value;
        }
        else {
            return " ? ";
        }
    };
    LiteralParameter.prototype.setValue = function (value) {
        this.value = value;
        this.onUpdate();
    };
    return LiteralParameter;
}(RenderParameter));
var EnumParameter = /** @class */ (function (_super) {
    __extends(EnumParameter, _super);
    function EnumParameter(parent, value) {
        var _this = _super.call(this, parent) || this;
        _this.value = value;
        return _this;
    }
    EnumParameter.prototype.plainValue = function () {
        return "'" + this.value + "'";
    };
    EnumParameter.prototype.getDataType = function () {
        return DataType.Enum;
    };
    EnumParameter.prototype.renderXPath = function () {
        var dataType = this.getDataType();
        return ("'" + this.value + "'").replace(/''/g, "'");
    };
    EnumParameter.prototype.setValue = function (value) {
        this.value = value;
        // this.type = type;
        this.onUpdate();
    };
    return EnumParameter;
}(RenderParameter));
var XPathAttribute = /** @class */ (function (_super) {
    __extends(XPathAttribute, _super);
    function XPathAttribute(parent, attribute, onPath) {
        var _this = _super.call(this, parent) || this;
        _this.attribute = attribute;
        _this.onPath = onPath;
        return _this;
    }
    XPathAttribute.prototype.plainValue = function () {
        return this.renderXPath();
    };
    XPathAttribute.prototype.renderXPath = function () {
        return "" + (this.onPath ? '/' : '') + this.attribute.qualifiedName;
    };
    XPathAttribute.prototype.getDataType = function () {
        return this.attribute.dataType;
    };
    return XPathAttribute;
}(XPathMember));
var XPathAssociation = /** @class */ (function (_super) {
    __extends(XPathAssociation, _super);
    function XPathAssociation(parent, fromEntityName, associationName, onPath) {
        var _this = _super.call(this, parent) || this;
        _this.fromEntityName = fromEntityName;
        _this.associationName = associationName;
        _this.onPath = onPath;
        _this.entity = null;
        return _this;
    }
    XPathAssociation.prototype.plainValue = function () {
        return "" + (this.onPath ? '/' : '') + this.associationName + (!!this.entity ? "/" + this.entity.entityName : '');
    };
    XPathAssociation.prototype.getAssociation = function () {
        return domain.entities[this.fromEntityName].getAssociation(this.associationName);
    };
    XPathAssociation.prototype.renderXPath = function () {
        if (this.entity === null) {
            return "" + (this.onPath ? '/' : '') + this.associationName;
        }
        else {
            return "" + (this.onPath ? '/' : '') + this.associationName + "/" + this.entity.renderXPath();
        }
    };
    XPathAssociation.prototype.getXPathEntity = function () {
        var entity = this.getParent();
        while (!(entity instanceof XPathEntity)) {
            if (entity == null) {
                throw new Error("No entity found.");
            }
            entity = entity.getParent();
        }
        return entity;
    };
    XPathAssociation.prototype.usingEntity = function () {
        // Returns if the association is using an entity in its path
        return !!this.entity;
    };
    XPathAssociation.prototype.useEntity = function () {
        // Uses the entity on the other side of the association.
        if (this.getXPathEntity().entityName === this.getAssociation().entityFrom.qualifiedName) {
            this.entity = new XPathEntity(this, this.getAssociation().otherEntity(this.getAssociation().entityFrom.qualifiedName));
        }
        else {
            this.entity = new XPathEntity(this, this.getAssociation().entityFrom.qualifiedName);
        }
        this.onUpdate();
        return this.entity;
    };
    XPathAssociation.prototype.useEntityName = function () {
        // Reveals just the entity name
        if (this.getXPathEntity().entityName === this.getAssociation().entityFrom.qualifiedName) {
            return this.getAssociation().entityTo.qualifiedName;
        }
        else {
            return this.getAssociation().entityFrom.qualifiedName;
        }
    };
    XPathAssociation.prototype.discardEntity = function () {
        this.entity = null;
        this.onUpdate();
    };
    XPathAssociation.prototype.toggleUseEntity = function () {
        if (this.entity === null) {
            this.useEntity();
        }
        else {
            this.discardEntity();
        }
    };
    XPathAssociation.prototype.getDataType = function () {
        return DataType.Association;
    };
    XPathAssociation.prototype.getAttributeAtTheEnd = function () {
        if (this.usingEntity()) {
            if (this.entity.hasMember() && (this.entity.member instanceof XPathAssociation)) {
                var nextAssociation = this.getXPathEntity().member;
                return nextAssociation.getAttributeAtTheEnd();
            }
            else if (this.entity.hasMember() && (this.entity.member instanceof XPathAttribute)) {
                var attribute = this.entity.member;
                return attribute;
            }
        }
        return null;
    };
    return XPathAssociation;
}(XPathMember));
var XPathEntity = /** @class */ (function (_super) {
    __extends(XPathEntity, _super);
    function XPathEntity(parent, entityName) {
        var _this = _super.call(this, parent) || this;
        _this.entityName = entityName;
        if (!(typeof (entityName) === "string")) {
            throw new Error("Not string");
        }
        _this.conditions = [];
        _this.member = null;
        return _this;
    }
    XPathEntity.prototype.isRoot = function () {
        return this.getParent() instanceof XPath;
    };
    XPathEntity.prototype.getEntity = function () {
        return domain.entities[this.entityName];
    };
    XPathEntity.prototype.renderXPath = function () {
        var conditions = "";
        this.conditions.forEach(function (condition) {
            conditions += condition.renderXPath();
        });
        if (this.member !== null) {
            conditions += this.member.renderXPath();
        }
        return this.getEntity().qualifiedName + conditions;
    };
    XPathEntity.prototype.addCondition = function () {
        var condition = new Condition(this);
        this.conditions.push(condition);
        this.onUpdate();
        return condition;
    };
    XPathEntity.prototype.removeCondition = function (condition) {
        var conditions = [];
        if (!(condition instanceof Condition)) {
            condition = this.conditions[condition];
        }
        this.conditions.forEach(function (loopCondition) {
            if (loopCondition !== condition) {
                conditions.push(loopCondition);
            }
        });
        this.conditions = conditions;
        this.onUpdate();
        return this.conditions;
    };
    XPathEntity.prototype.hasConditions = function () {
        return this.conditions.length > 0;
    };
    XPathEntity.prototype.useMember = function (memberName) {
        if (this.isRoot()) {
            throw new Error("Members not allowed on root entity " + this.getEntity().qualifiedName + " of xpath.");
        }
        if (this.getEntity().memberIsAttribute(memberName)) {
            this.member = new XPathAttribute(this, this.getEntity().attributes[memberName], true);
        }
        else {
            this.member = new XPathAssociation(this, this.getEntity().qualifiedName, memberName, true);
        }
        this.onUpdate();
        return this.member;
    };
    XPathEntity.prototype.hasMember = function () {
        return !!this.member;
    };
    XPathEntity.prototype.discardMember = function () {
        this.member = null;
        this.onUpdate();
    };
    XPathEntity.prototype.listMembers = function () {
        return this.getEntity().memberNames;
    };
    XPathEntity.prototype.getDataType = function () {
        return DataType.Entity;
    };
    return XPathEntity;
}(Render));
var loadClass = function (obj, parent) {
    if (parent === void 0) { parent = null; }
    // Loads the prototype class for a freshly deserialized JSON object
    if ((obj !== null) && obj !== undefined) {
        var keys = Object.keys(obj);
        if (keys.indexOf("loadClass") !== -1) {
            var klass = Deserializer[obj.loadClass];
            Object.setPrototypeOf(obj, klass);
            obj.setup(parent);
            keys.forEach(function (key) {
                var member = obj[key];
                if ((key !== "loadClass") && (typeof (member) === "object")) {
                    if (!Array.isArray(member)) {
                        loadClass(member, obj);
                    }
                    else {
                        for (var idx = 0; idx < member.length; idx++) {
                            loadClass(member[idx], obj);
                        }
                    }
                }
            });
        }
    }
};
var deserialize = function (json) {
    var start = new Date();
    var obj = JSON.parse(json);
    loadClass(obj);
    console.log("Loaded in " + ((new Date()).getMilliseconds() - start.getMilliseconds()) + " milli-seconds.");
    return obj;
};
var XPath = /** @class */ (function (_super) {
    __extends(XPath, _super);
    function XPath() {
        var _this = _super.call(this, null) || this;
        _this.entityName = "?";
        return _this;
    }
    XPath.deserialize = function (json) {
        return deserialize(json);
    };
    XPath.prototype.serialize = function () {
        return JSON.stringify(this);
    };
    XPath.prototype.setEntity = function (entityName) {
        if (domain.entityNames.indexOf(entityName) === -1) {
            throw new Error("Invalid entity " + entityName);
        }
        this.entityName = entityName;
        this.rootEntity = new XPathEntity(this, entityName);
        this.onUpdate();
        return this.rootEntity;
    };
    XPath.prototype.renderXPath = function () {
        if (this.rootEntity) {
            return "//" + this.rootEntity.renderXPath();
        }
        else {
            return "Select an entity first.";
        }
    };
    XPath.prototype.getDataType = function () {
        return DataType.List;
    };
    return XPath;
}(Render));
var Deserializer = {};
Deserializer[functionName(Condition.prototype.constructor)] = Condition.prototype;
Deserializer[functionName(Expression.prototype.constructor)] = Expression.prototype;
Deserializer[functionName(LiteralParameter.prototype.constructor)] = LiteralParameter.prototype;
Deserializer[functionName(EnumParameter.prototype.constructor)] = EnumParameter.prototype;
Deserializer[functionName(RenderParameter.prototype.constructor)] = RenderParameter.prototype;
Deserializer[functionName(RenderToken.prototype.constructor)] = RenderToken.prototype;
Deserializer[functionName(XPath.prototype.constructor)] = XPath.prototype;
Deserializer[functionName(XPathAssociation.prototype.constructor)] = XPathAssociation.prototype;
Deserializer[functionName(XPathAttribute.prototype.constructor)] = XPathAttribute.prototype;
Deserializer[functionName(XPathEntity.prototype.constructor)] = XPathEntity.prototype;
Deserializer[functionName(XPathMember.prototype.constructor)] = XPathMember.prototype;
Deserializer[functionName(EmptyParameter.prototype.constructor)] = EmptyParameter.prototype;
Deserializer[functionName(BlankParameter.prototype.constructor)] = BlankParameter.prototype;
var xpaths = {};
xpaths["XPath"] = XPath;
xpaths["XPathEntity"] = XPathEntity;
xpaths["XPathAttribute"] = XPathAttribute;
xpaths["XPathAssociation"] = XPathAssociation;
xpaths["XPathMember"] = XPathMember;
xpaths["Entity"] = Entity;
xpaths["Attribute"] = Attribute;
xpaths["Association"] = Association;
xpaths["RenderToken"] = RenderToken;
xpaths["RenderExpression"] = RenderExpression;
xpaths["RenderParameter"] = RenderParameter;
xpaths["Render"] = Render;
xpaths["EmptyParameter"] = EmptyParameter;
xpaths["domain"] = domain;
xpaths["ExpressionType"] = ExpressionType;
xpaths["Expression"] = Expression;
xpaths["Condition"] = Condition;
xpaths["EnumParameter"] = EnumParameter;
xpaths["BlankParameter"] = BlankParameter;
xpaths["EmptyParameter"] = EmptyParameter;
xpaths["LiteralParameter"] = LiteralParameter;
xpaths["DataType"] = DataType;
xpaths["getFriendlyRenderExpression"] = function () {
    // For drop-down. Should be moved to XPath
    var friendly = [];
    Object.keys(ExpressionType).forEach(function (key) {
        var expression = ExpressionType[key];
        console.log("" + key);
        var template = RenderExpression[expression].xpathTemplate.replace("\$0", "…").replace("\$1", "…");
        if (template === '…') {
            template = "No function";
        }
        friendly.push({ display: "" + template, name: template, type: "" + expression, id: key });
    });
    friendly.push({ display: "<span style=\"color: red\">Remove expression</span>", name: "", type: "remove-expression", id: "remove-expression" });
    return friendly;
};
window["xpaths"] = xpaths;
define([
    "dojo/_base/declare"
], function (declare) {
    "use strict";
    var result = declare("XPath.widget.lib.Constructor", [], {
    //
    });
    return result;
});
require(["XPath/widget/lib/Constructor"]);
