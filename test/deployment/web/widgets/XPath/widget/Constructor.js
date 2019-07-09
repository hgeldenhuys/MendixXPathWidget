/*
    Start of Domain Layer.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function functionName(fun) {
    var ret = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
}
/*
    Enumerations
*/
// Generic Data Type Enumeration
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
})(DataType || (DataType = {}));
// Date-time tokens
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
    Association.prototype.setup = function (entity) {
        this.entityFrom = entity;
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
        this.associations = {};
        this.associationNames = [];
        entity.getReferenceAttributes().forEach(function (associationName) {
            var association = new Association(associationName, _this);
            _this.associations[associationName] = association;
            _this.associationNames.push(associationName);
            _this.memberNames.push(associationName);
        });
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
            if (mxEntity.isPersistable()) {
                var entity_1 = new Entity(entityName, mxEntity);
                _this.entities[entityName] = entity_1;
                _this.entityNames.push(entityName);
                entity_1.associationNames.forEach(function (associationName) {
                    var association = entity_1.associations[associationName];
                    _this.associations[association.qualifiedName] = association;
                    associationNames.push(association.qualifiedName);
                });
            }
        });
        var loggedWarning = [];
        associationNames.forEach(function (associationName) {
            var association = _this.associations[associationName];
            var entityToName = association.entityFrom.mxEntity.getSelectorEntity(association.qualifiedName);
            association.entityTo = _this.entities[entityToName];
            try {
                _this.entities[entityToName].associations[associationName] = association;
                _this.entities[entityToName].associationNames.push(associationName);
                _this.entities[entityToName].memberNames.push(associationName);
                _this.associationNames.push(associationName);
            }
            catch (e) {
                if (loggedWarning.indexOf("You are not allowed to view " + associationName) === -1) {
                    console.warn("You are not allowed to view " + associationName);
                    loggedWarning.push("You are not allowed to view " + associationName);
                }
            }
        });
    }
    return DomainModel;
}());
var domain = new DomainModel();
/*
    End of Domain Layer
*/
/*
    Start of XPath Controller Objects
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
var Render = /** @class */ (function () {
    function Render(parent) {
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
    }; //
    Render.prototype.onUpdate = function () {
        var root = this.getRoot();
        root.events().on("update", [root, this]);
    };
    return Render;
}());
var RenderParameter = /** @class */ (function (_super) {
    __extends(RenderParameter, _super);
    function RenderParameter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RenderParameter;
}(Render));
var RenderToken = /** @class */ (function (_super) {
    __extends(RenderToken, _super);
    function RenderToken(parent, token) {
        var _this = _super.call(this, parent) || this;
        _this.token = token;
        return _this;
    }
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
var ExpressionType;
(function (ExpressionType) {
    ExpressionType["None"] = "None";
    ExpressionType["NotEquals"] = "Not Equals";
    ExpressionType["LessThan"] = "Less Than";
    ExpressionType["LessOrEqualThan"] = "Less Or Equal Than";
    ExpressionType["Equals"] = "Equals";
    ExpressionType["GreaterThan"] = "Less Than";
    ExpressionType["GreaterOrEqualThan"] = "Less Or Equal Than";
    ExpressionType["And"] = "And";
    ExpressionType["Contains"] = "Contains";
    ExpressionType["Empty"] = "Empty";
    ExpressionType["DayFromDateTime"] = "Day From Date Time";
    ExpressionType["DayOfYearFromDateTime"] = "Day Of Year From Date Time";
    ExpressionType["EndsWith"] = "Ends With";
    ExpressionType["False"] = "False";
    ExpressionType["HoursFromDateTime"] = "Hours From Date Time";
    ExpressionType["Length"] = "Or";
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
var ExpressionConfig = /** @class */ (function () {
    function ExpressionConfig(parameterCount, template, returnDataType) {
        this.parameterCount = parameterCount;
        this.template = template;
        this.returnDataType = returnDataType;
    }
    return ExpressionConfig;
}());
var RenderExpression = {};
RenderExpression[ExpressionType.None] = new ExpressionConfig(1, "$0", DataType.CheckExpression);
RenderExpression[ExpressionType.And] = new ExpressionConfig(1, "and $0", DataType.Boolean);
RenderExpression[ExpressionType.Or] = new ExpressionConfig(1, "or $0", DataType.Boolean);
RenderExpression[ExpressionType.Equals] = new ExpressionConfig(1, "= $0", DataType.CheckExpression);
RenderExpression[ExpressionType.NotEquals] = new ExpressionConfig(1, "!= $0", DataType.CheckExpression);
RenderExpression[ExpressionType.Not] = new ExpressionConfig(1, "not($0)", DataType.Boolean);
RenderExpression[ExpressionType.HasNoEntity] = new ExpressionConfig(1, "not($0)", DataType.Entity);
RenderExpression[ExpressionType.Contains] = new ExpressionConfig(2, "contains($0, $1)", DataType.Boolean);
RenderExpression[ExpressionType.LessThan] = new ExpressionConfig(1, "< $0", DataType.CheckExpression);
RenderExpression[ExpressionType.LessOrEqualThan] = new ExpressionConfig(1, "<= ", DataType.CheckExpression);
RenderExpression[ExpressionType.GreaterThan] = new ExpressionConfig(1, "> $0", DataType.CheckExpression);
RenderExpression[ExpressionType.GreaterOrEqualThan] = new ExpressionConfig(1, ">= $0", DataType.CheckExpression);
RenderExpression[ExpressionType.Empty] = new ExpressionConfig(0, "empty", DataType.Empty);
RenderExpression[ExpressionType.DayFromDateTime] = new ExpressionConfig(1, "day-from-dateTime($0)", DataType.Integer);
RenderExpression[ExpressionType.DayOfYearFromDateTime] = new ExpressionConfig(1, "day-of-year-from-dateTime($0)", DataType.Integer);
RenderExpression[ExpressionType.EndsWith] = new ExpressionConfig(1, "ends-with($0)", DataType.Boolean);
RenderExpression[ExpressionType.False] = new ExpressionConfig(0, "false()", DataType.Boolean);
RenderExpression[ExpressionType.HoursFromDateTime] = new ExpressionConfig(1, "hours-from-dateTime($0)", DataType.Integer);
RenderExpression[ExpressionType.Length] = new ExpressionConfig(1, "length($0)", DataType.Integer);
RenderExpression[ExpressionType.MinutesFromDateTime] = new ExpressionConfig(1, "minutes-from-dateTime($0)", DataType.Integer);
RenderExpression[ExpressionType.MonthsFromDateTime] = new ExpressionConfig(1, "months-from-dateTime($0)", DataType.Integer);
RenderExpression[ExpressionType.Not] = new ExpressionConfig(1, "not($0)", DataType.Boolean);
RenderExpression[ExpressionType.HasNoEntity] = new ExpressionConfig(1, "not($0)", DataType.Boolean);
RenderExpression[ExpressionType.Or] = new ExpressionConfig(1, "or $0", DataType.Boolean);
RenderExpression[ExpressionType.QuarterFromDateTime] = new ExpressionConfig(1, "quarter-from-dateTime($0)", DataType.Integer);
RenderExpression[ExpressionType.Reversed] = new ExpressionConfig(1, "reversed($0)", DataType.Association);
RenderExpression[ExpressionType.SecondsFromDateTime] = new ExpressionConfig(1, "seconds-from-dateTime($0)", DataType.Integer);
RenderExpression[ExpressionType.StartsWith] = new ExpressionConfig(1, "starts-with($0)", DataType.Boolean);
RenderExpression[ExpressionType.StringLength] = new ExpressionConfig(1, "string-length($0)", DataType.Integer);
RenderExpression[ExpressionType.True] = new ExpressionConfig(0, "true()", DataType.Boolean);
RenderExpression[ExpressionType.WeekFromDateTime] = new ExpressionConfig(1, "week-from-dateTime($0)", DataType.Integer);
RenderExpression[ExpressionType.WeekDayFromDateTime] = new ExpressionConfig(1, "week-day-from-dateTime($0)", DataType.Integer);
RenderExpression[ExpressionType.YearFromDateTime] = new ExpressionConfig(1, "year-from-dateTime($0)", DataType.Integer);
var BlankParameter = /** @class */ (function (_super) {
    __extends(BlankParameter, _super);
    function BlankParameter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlankParameter.prototype.renderXPath = function () {
        return "...";
    };
    BlankParameter.prototype.getDataType = function () {
        return DataType.Unknown;
    };
    return BlankParameter;
}(RenderParameter));
var Expression = /** @class */ (function (_super) {
    __extends(Expression, _super);
    function Expression(parent, expressionType, startParenthises, endParenthises) {
        if (expressionType === void 0) { expressionType = ExpressionType.None; }
        if (startParenthises === void 0) { startParenthises = false; }
        if (endParenthises === void 0) { endParenthises = false; }
        var _this = _super.call(this, parent) || this;
        _this.startParenthises = startParenthises;
        _this.endParenthises = endParenthises;
        _this.setExpressionType(expressionType);
        return _this;
    }
    Expression.prototype.setup = function (parent) {
        _super.prototype.setup.call(this, parent);
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
    Expression.prototype.setExpressionType = function (expressionType) {
        if ((this.parameters === null) || (this.parameters === undefined)) {
            this.parameters = [];
        }
        this.expressionType = expressionType;
        for (var idx = 0; idx < RenderExpression[expressionType].parameterCount; idx++) {
            if ((this.parameters[idx] === null) || (this.parameters[idx] === undefined)) {
                this.parameters[idx] = new BlankParameter(this);
            }
        }
        var currentLength = Object.keys(this.parameters).length;
        for (var idx = RenderExpression[expressionType].parameterCount; idx < currentLength; idx++) {
            delete this.parameters[idx];
        }
        this.onUpdate();
    };
    Expression.prototype.setLiteralParameter = function (index, value) {
        if (!this.parameters[index] === undefined) {
            throw new Error("Invalid parameter index " + index + " for expression " + this.expressionType);
        }
        this.parameters[index] = new LiteralParameter(this, value);
        this.onUpdate();
        return this.parameters[index];
    };
    Expression.prototype.setAttributeParameter = function (index, attributeName) {
        if (this.getXPathEntity().getEntity().attributeNames.indexOf(attributeName) === -1) {
            throw new Error("Invalid attribute \"" + attributeName + "\" for entity \"" + this.getXPathEntity().entityName + "(" + this.getXPathEntity().getEntity().attributeNames + ")\"");
        }
        this.parameters[index] = new XPathAttribute(this.getXPathEntity(), this.getXPathEntity().getEntity().attributes[attributeName], false);
        this.onUpdate();
        return this.parameters[index];
    };
    Expression.prototype.setAssociationParameter = function (index, associationName) {
        if (this.getXPathEntity().getEntity().associationNames.indexOf(associationName) === -1) {
            throw new Error("Invalid association \"" + associationName + "\" for entity \"" + this.getXPathEntity().entityName + "\"");
        }
        this.parameters[index] = new XPathAssociation(this.getXPathEntity(), this.getXPathEntity().entityName, associationName, false);
        this.onUpdate();
        return this.parameters[index];
    };
    Expression.prototype.setTokenParameter = function (index, token) {
        this.parameters[index] = new RenderToken(this, token);
        this.onUpdate();
        return this.parameters[index];
    };
    Expression.prototype.renderXPath = function () {
        var result = RenderExpression[this.expressionType].xpathTemplate;
        for (var idx = 0; idx < RenderExpression[this.expressionType].parameterCount; idx++) {
            result = result.replace("$" + idx, "" + this.parameters[idx].renderXPath());
        }
        return "" + (this.leftParenthesis ? '(' : '') + result + (this.rightParenthesis ? ")" : "");
    };
    Expression.prototype.getDataType = function () {
        if (RenderExpression[this.expressionType].returnDataType === DataType.CheckExpression) {
            return this.parameters[0].getDataType();
        }
        else {
            return RenderExpression[this.expressionType].returnDataType;
        }
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
            return "'" + this.value + "'";
        }
        else if ((dataType === DataType.Integer) || (dataType === DataType.Decimal)) {
            return this.value;
        }
        else {
            return "?";
        }
    };
    LiteralParameter.prototype.setValue = function (value) {
        this.value = value;
        this.onUpdate();
    };
    return LiteralParameter;
}(RenderParameter));
var XPathAttribute = /** @class */ (function (_super) {
    __extends(XPathAttribute, _super);
    function XPathAttribute(xPathEntity, attribute, onPath) {
        var _this = _super.call(this, xPathEntity) || this;
        _this.attribute = attribute;
        _this.onPath = onPath;
        return _this;
    }
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
    function XPathAssociation(xPathEntity, fromEntityName, associationName, onPath) {
        var _this = _super.call(this, xPathEntity) || this;
        _this.fromEntityName = fromEntityName;
        _this.associationName = associationName;
        _this.onPath = onPath;
        _this.entity = null;
        return _this;
    }
    XPathAssociation.prototype.getAssociation = function () {
        return domain.entities[this.fromEntityName].associations[this.associationName];
    };
    XPathAssociation.prototype.renderXPath = function () {
        if (this.entity === null) {
            return "" + (this.onPath ? '/' : '') + this.associationName;
        }
        else {
            return "" + (this.onPath ? '/' : '') + this.associationName + "/" + this.entity.renderXPath();
        }
    };
    XPathAssociation.prototype.useEntity = function () {
        if (this.getParent().entityName === this.getAssociation().entityFrom.qualifiedName) {
            this.entity = new XPathEntity(this, this.getAssociation().entityTo.qualifiedName);
        }
        else {
            this.entity = new XPathEntity(this, this.getAssociation().entityFrom.qualifiedName);
        }
        this.onUpdate();
        return this.entity;
    };
    XPathAssociation.prototype.discardEntity = function () {
        this.onUpdate();
        this.entity = null;
    };
    XPathAssociation.prototype.getDataType = function () {
        return DataType.Association;
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
        return this.member;
    };
    XPathEntity.prototype.discardMember = function () {
        this.member = null;
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
Deserializer[functionName(RenderParameter.prototype.constructor)] = RenderParameter.prototype;
Deserializer[functionName(RenderToken.prototype.constructor)] = RenderToken.prototype;
Deserializer[functionName(XPath.prototype.constructor)] = XPath.prototype;
Deserializer[functionName(XPathAssociation.prototype.constructor)] = XPathAssociation.prototype;
Deserializer[functionName(XPathAttribute.prototype.constructor)] = XPathAttribute.prototype;
Deserializer[functionName(XPathEntity.prototype.constructor)] = XPathEntity.prototype;
Deserializer[functionName(XPathMember.prototype.constructor)] = XPathMember.prototype;
// /*
//     Mini Unit-Test.
// */
// const x = new XPath();
// x.events().addListener("update", (root, render): void => {
//     console.log(`>> ${root.renderXPath()}, ${root.loadClass}, ${render.loadClass}`);
// });
// x.setEntity('Innov8.Sink');
// const cond1 = x.rootEntity.addCondition();
// cond1.expressions[0].setExpressionType(ExpressionType.DayFromDateTime);
// const attr = cond1.expressions[0].setAttributeParameter(0, "ADateTime");
// console.log(x.renderXPath());
// const cond2 = x.rootEntity.addCondition();
// const ass = cond2.expressions[0].setAssociationParameter(0, "Innov8.Sink_LinkedTo");
// const ent1 = ass.useEntity();
// const exp = cond2.addExpression(ExpressionType.Contains);
// const p1 = exp.setTokenParameter(0, Token.BeginOfCurrentDay);
// const p2 = exp.setTokenParameter(1, Token.BeginOfCurrentDay);
// const as2 = ass.entity.useMember("Innov8.Sink_LinkedTo") as XPathAssociation;
// const ent2 = as2.useEntity();
// const ex3 = cond1.addExpression();
// const ex4 = cond1.addExpression();
// ex3.setAttributeParameter(0, "AnAutoNumber");
// ex3.setExpressionType(ExpressionType.Equals);
// ex4.setLiteralParameter(0, 'abc');
// ex4.setExpressionType(ExpressionType.Or);
// console.log(x.renderXPath());
//
// const x2 = x.serialize();
// const x3 = XPath.deserialize(x2);
// console.log(`x.renderXPath() === x3.renderXPath() :: ${x.renderXPath() === x3.renderXPath()}`);
define([
    "dojo/_base/declare",
], function (declare) {
    "use strict";
    return declare("XPath.widget.Constructor", [], {
        domainModel: domain,
        xPath: XPath,
        newXPath: function () {
            return new XPath();
        },
        getXPathClass: function () {
            return XPath;
        },
        getDomain: function () {
            return domain;
        }
    });
});
require(["XPath/widget/Constructor"]);
