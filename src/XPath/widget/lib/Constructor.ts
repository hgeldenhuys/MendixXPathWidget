/*
    Start of Domain Layer
*/
declare const module;

function functionName(fun) {
    /* Used for finding the right class name for an object
    for the purpose of serializing it to JSON and the using the classname
    to instantiate the correct class */
    let ret = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
}

// Generic Data Type Enumeration.
enum DataType {
    String = "String",
    HashString = "HashString",
    Boolean = "Boolean",
    Currency = "Currency",
    DateTime = "DateTime",
    Enum = "Enum",
    Integer = "Integer",
    AutoNumber = "AutoNumber",
    BigDecimal = "BigDecimal",
    Decimal = "Decimal",
    Long = "Long",
    Numeric = "Numeric",
    Float = "Float",
    Binary = "Binary",
    Association = "Association",
    Entity = "Entity",
    CheckExpression = "CheckExpression",
    List = "List",
    Empty = "Empty",
    Unknown = "Unknown",
    Blank = "Blank"
}

// Date-time tokens.
enum Token {
    CurrentDateTime = "'[%CurrentDateTime%]'",
    BeginOfCurrentDay = "'[%BeginOfCurrentDay%]'",
    BeginOfCurrentDayUTC = "'[%BeginOfCurrentDayUTC%]'",
    BeginOfCurrentHour = "'[%BeginOfCurrentHour%]'",
    BeginOfCurrentHourUTC = "'[%BeginOfCurrentHourUTC%]'",
    BeginOfCurrentMinute = "'[%BeginOfCurrentMinute%]'",
    BeginOfCurrentMinuteUTC = "'[%BeginOfCurrentMinuteUTC%]'",
    BeginOfCurrentMonth = "'[%BeginOfCurrentMonth%]'",
    BeginOfCurrentMonthUTC = "'[%BeginOfCurrentMonthUTC%]'",
    BeginOfCurrentWeek = "'[%BeginOfCurrentWeek%]'",
    BeginOfCurrentWeekUTC = "'[%BeginOfCurrentWeekUTC%]'",
    BeginOfCurrentYear = "'[%BeginOfCurrentYear%]'",
    BeginOfCurrentYearUTC = "'[%BeginOfCurrentYearUTC%]'",
    EndOfCurrentDay = "'[%EndOfCurrentDay%]'",
    EndOfCurrentDayUTC = "'[%EndOfCurrentDayUTC%]'",
    EndOfCurrentHour = "'[%EndOfCurrentHour%]'",
    EndOfCurrentHourUTC = "'[%EndOfCurrentHourUTC%]'",
    EndOfCurrentMinute = "'[%EndOfCurrentMinute%]'",
    EndOfCurrentMinuteUTC = "'[%EndOfCurrentMinuteUTC%]'",
    EndOfCurrentMonth = "'[%EndOfCurrentMonth%]'",
    EndOfCurrentMonthUTC = "'[%EndOfCurrentMonthUTC%]'",
    EndOfCurrentWeek = "'[%EndOfCurrentWeek%]'",
    EndOfCurrentWeekUTC = "'[%EndOfCurrentWeekUTC%]'",
    EndOfCurrentYear = "'[%EndOfCurrentYear%]'",
    EndOfCurrentYearUTC = "'[%EndOfCurrentYearUTC%]'",
}

enum ExpressionType {
    None = "None",
    Comma = "Comma",
    NotEquals = "Not Equals",
    LessThan = "Less Than",
    LessOrEqualThan = "Less Or Equal Than",
    Equals = "Equals",
    GreaterThan = "Greater Than",
    GreaterOrEqualThan = "Greater Or Equal Than",
    And = "And",
    Contains = "Contains",
    DayFromDateTime = "Day From Date Time",
    DayOfYearFromDateTime = "Day Of Year From Date Time",
    EndsWith = "Ends With",
    False = "False",
    HoursFromDateTime = "Hours From Date Time",
    Length = "Length",
    MinutesFromDateTime = "Minutes From Date Time",
    MonthsFromDateTime = "Months From Date Time",
    Not = "Not",
    HasNoEntity = "Has No Entity",
    Or = "Or",
    QuarterFromDateTime = "Quarter From Date Time",
    Reversed = "Reversed",
    SecondsFromDateTime = "Seconds From Date Time",
    StartsWith = "StartsWith",
    StringLength = "String Length",
    True = "True",
    WeekFromDateTime = "Week From Date Time",
    WeekDayFromDateTime = "Weekday From Date Time",
    YearFromDateTime = "Year From Date Time"
}

/*
    A DataItem is any artefact that belongs in the Domain Model of Mendix, like Entities, Associations and attributes
*/
abstract class DataItem {
    public name: string;
    public module: string;
    public constructor(public qualifiedName: string, object?: any) {
        this.module = qualifiedName.split('.')[0];
        this.name = qualifiedName.split('.').reverse()[0];
        if (object) {
            this.setup(object);
        }
    }
    public abstract setup(object: any);
}

/*
    Entity Members are Assiciations and Attributes
*/
abstract class Member extends DataItem {
}

class Attribute extends Member {
    public dataType: DataType;
    public setup(entity) {
        this.module = entity.qualifiedName.split('.')[0];
        this.dataType = DataType[entity.mxEntity.getAttributeType(this.qualifiedName)] as DataType;
    }
}

class Association extends Member {
    public static newAssociation(assoicationName: string, parent: Entity) {
        return new Association(assoicationName, parent);
    }
    // private static associations: {} = {};
    public entityFrom: Entity;
    // private entityTo: Entity[];
    public setup(entity: Entity) {
        this.entityFrom = entity;
    }
    public otherEntity(entityName: string): string {
        const entityTo: string = this.entityFrom.mxEntity.getSelectorEntity(this.qualifiedName);
        if (entityTo === entityName) {
            return this.entityFrom.qualifiedName;
        } else {
            return entityTo;
        }
    }
}

class Entity extends DataItem {
    public attributes: {};
    public attributeNames: string[];
    public associationNames: string[];
    public mxEntity: any;
    public memberNames: string[];
    private _associations: {};
    public setup(entity) {
        this.memberNames = [];
        this.mxEntity = entity;
        this.attributes = {};
        this.attributeNames = [];
        entity.getAttributesWithoutReferences().forEach((attributeName) => {
            const attribute = new Attribute(attributeName, this);
            this.attributes[attributeName] = attribute;
            this.attributeNames.push(attributeName);
            this.memberNames.push(attributeName);
        });
        this._associations = {};
        this.associationNames = [];
        entity.getReferenceAttributes().forEach((associationName) => {
            this.addAssociation(associationName);
        });
    }
    public addAssociation(association: string | Association) {
        const associationName = association instanceof Association ? association.qualifiedName : association;
        if (this.associationNames.indexOf(associationName) === -1) {
            this._associations[associationName] = association instanceof Association ? association : Association.newAssociation(associationName, this);
            this.associationNames.push(associationName);
            this.memberNames.push(associationName);
        }
    }
    public getAssociation(associationName: string) {
        return this._associations[associationName];
    }
    public memberIsAttribute(memberName: string) {
        if (this.memberNames.indexOf(memberName) === -1) {
            throw new Error(`Invalid member ${memberName}`);
        } else {
            return this.attributeNames.indexOf(memberName) > -1;
        }
    }
}

class DomainModel {
    public entities: {};
    public associations: {};
    public entityNames: string[];
    public associationNames: string[];
    public constructor() {
        this.entities = {};
        this.entityNames = [];
        this.associationNames = [];
        this.associations = {};
        const associationNames = [];
        Object.keys(mx.meta.getMap()).sort().forEach((entityName) => {
            const mxEntity = mx.meta.getEntity(entityName);
            if (!mxEntity.isPersistable || mxEntity.isPersistable()) {
                const entity: Entity = new Entity(entityName, mxEntity);
                this.entities[entityName] = entity;
                this.entityNames.push(entityName);
                entity.associationNames.forEach((associationName) => {
                    const association = entity.getAssociation(associationName);
                    this.associations[association.qualifiedName] = association;
                    associationNames.push(association);
                });
            }
        });
        const loggedWarning = [];
        associationNames.forEach((association: Association) => {
            const associationName = association.qualifiedName;
            const entityToName = association.entityFrom.mxEntity.getSelectorEntity(association.qualifiedName);
            // association.entityTo = this.entities[entityToName];
            try {
                const entity: Entity = this.entities[entityToName];
                entity.addAssociation(association);
                this.associationNames.push(associationName);
                // association.entityTo.addAssociation(associationName);
            } catch (e) {
                if (loggedWarning.indexOf(`You are not allowed to view ${associationName}`) === -1) {
                    console.warn(`You are not allowed to view ${associationName}`);
                    loggedWarning.push(`You are not allowed to view ${associationName}`);
                }
            }
            // association.entityFrom.mxEntity
        });
    }
}

const domain: DomainModel = new DomainModel();
/*
    End of Domain Layer.
*/

/*
    Start of XPath Controller Objects.
*/

class EventListener {
    public eventListeners: Array<{event: string, listeners: Array<() => {}>}>;
    public constructor() {
        this.eventListeners = [];
    }
    public registerEvent(eventName: string) {
        const eventListener = {event: eventName, listeners: []};
        this.eventListeners.push(eventListener);
        return eventListener;
    }
    public getEventListeners(eventName: string) {
        let result: any;
        this.eventListeners.forEach((eventListener) => {
            if (eventListener.event === eventName) {
                result = eventListener;
            }
        });
        if (!result) {
            return this.registerEvent(eventName);
        } else {
            return result;
        }
    }
    public addListener(eventName: string, listener: any) {
        this.getEventListeners(eventName).listeners.push(listener);
    }
    public on(eventName: string, args: any[] = []) {
        this.getEventListeners(eventName).listeners.forEach((listener) => {
            listener.apply(this, args);
        });
    }
}

const newGuid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

abstract class Render {
    public id: string;
    public loadClass: string;
    public constructor(parent: Render) {
        this.id = newGuid();
        this.setup(parent);
    }
    public events(): EventListener {
        return null;
    }
    public getParent(): Render {
        return null;
    }
    public getRoot(): Render {
        let root: Render = this as Render;
        let child: Render = root;
        while (root !== null) {
            child = root;
            root = root.getParent();
        }
        return child;
    }
    public abstract renderXPath(): string;
    public abstract getDataType(): DataType;
    public setup(parent: Render) {
        const events = new EventListener();
        this.getParent = () => {
            return parent;
        };
        this.events = () => {
            return events;
        };
        this.loadClass = functionName((this as any).__proto__.constructor);
        this.getParent = () => {
            return parent;
        };
    }
    public onUpdate() {
        const root = this.getRoot();
        root.events().on("update", [root, this]);
    }
    public renderDom(render: Render, parentDom: any) {
        console.error(`Implement me.`);
    }
}

abstract class RenderParameter extends Render {
    // /
    public abstract plainValue(): string;
    public getExpression() {
        return this.getParent() as Expression;
    }
    public getEntityOwner() {
        let parent: Render = this.getParent();
        while (!(parent instanceof XPathEntity)) {
            parent = parent.getParent();
        }
        return parent as XPathEntity;
    }
}

class RenderToken extends RenderParameter {
    public constructor(parent: Render, public token: Token) {
        super(parent);
    }
    public plainValue() {
        return this.token;
    }
    public setup(parent: Render) {
        super.setup(parent);
    }
    public renderXPath() {
        return this.token.toString();
    }
    public getDataType() {
        return DataType.DateTime;
    }
}
class ExpressionConfig {
    public constructor(public parameterCount: number, public xpathTemplate: string, public returnDataType: DataType, public startWithParenthises) {
    }
}

const RenderExpression = {};
RenderExpression[ExpressionType.None] = new ExpressionConfig(1, `$0`, DataType.CheckExpression, false);
RenderExpression[ExpressionType.Comma] = new ExpressionConfig(0, `, `, DataType.Unknown, false);
RenderExpression[ExpressionType.And] = new ExpressionConfig(1, `and ($0)`, DataType.Boolean, false);
RenderExpression[ExpressionType.Or] = new ExpressionConfig(1, `or ($0)`, DataType.Boolean, false);
RenderExpression[ExpressionType.Equals] = new ExpressionConfig(1, `= ($0)`, DataType.CheckExpression, false);
RenderExpression[ExpressionType.NotEquals] = new ExpressionConfig(1, `!= ($0)`, DataType.CheckExpression, false);
RenderExpression[ExpressionType.Not] = new ExpressionConfig(1, `not($0)`, DataType.Boolean, true);
RenderExpression[ExpressionType.HasNoEntity] = new ExpressionConfig(1, `not($0)`, DataType.Entity, true);
RenderExpression[ExpressionType.Contains] = new ExpressionConfig(2, `contains($0, $1)`, DataType.Boolean, true);
RenderExpression[ExpressionType.LessThan] = new ExpressionConfig(1, `< ($0)`, DataType.CheckExpression, false);
RenderExpression[ExpressionType.LessOrEqualThan] = new ExpressionConfig(1, `<= ($0)`, DataType.CheckExpression, false);
RenderExpression[ExpressionType.GreaterThan] = new ExpressionConfig(1, `> ($0)`, DataType.CheckExpression, false);
RenderExpression[ExpressionType.GreaterOrEqualThan] = new ExpressionConfig(1, `>= ($0)`, DataType.CheckExpression, false);
RenderExpression[ExpressionType.DayFromDateTime] = new ExpressionConfig(1, `day-from-dateTime($0)`, DataType.Integer, true);
RenderExpression[ExpressionType.DayOfYearFromDateTime] = new ExpressionConfig(1, `day-of-year-from-dateTime($0)`, DataType.Integer, true);
RenderExpression[ExpressionType.EndsWith] = new ExpressionConfig(1, `ends-with($0)`, DataType.Boolean, true);
RenderExpression[ExpressionType.False] = new ExpressionConfig(0, `false()`, DataType.Boolean, true);
RenderExpression[ExpressionType.HoursFromDateTime] = new ExpressionConfig(1, `hours-from-dateTime($0)`, DataType.Integer, true);
RenderExpression[ExpressionType.Length] = new ExpressionConfig(1, `length($0)`, DataType.Integer, true);
RenderExpression[ExpressionType.MinutesFromDateTime] = new ExpressionConfig(1, `minutes-from-dateTime($0)`, DataType.Integer, true);
RenderExpression[ExpressionType.MonthsFromDateTime] = new ExpressionConfig(1, `months-from-dateTime($0)`, DataType.Integer, true);
RenderExpression[ExpressionType.QuarterFromDateTime] = new ExpressionConfig(1, `quarter-from-dateTime($0)`, DataType.Integer, true);
RenderExpression[ExpressionType.Reversed] = new ExpressionConfig(1, `reversed($0)`, DataType.Association, true);
RenderExpression[ExpressionType.SecondsFromDateTime] = new ExpressionConfig(1, `seconds-from-dateTime($0)`, DataType.Integer, true);
RenderExpression[ExpressionType.StartsWith] = new ExpressionConfig(2, `starts-with($0, $1)`, DataType.Boolean, true);
RenderExpression[ExpressionType.StringLength] = new ExpressionConfig(1, `string-length($0)`, DataType.Integer, true);
RenderExpression[ExpressionType.True] = new ExpressionConfig(0, `true()`, DataType.Boolean, true);
RenderExpression[ExpressionType.WeekFromDateTime] = new ExpressionConfig(1, `week-from-dateTime($0)`, DataType.Integer, true);
RenderExpression[ExpressionType.WeekDayFromDateTime] = new ExpressionConfig(1, `week-day-from-dateTime($0)`, DataType.Integer, true);
RenderExpression[ExpressionType.YearFromDateTime] = new ExpressionConfig(1, `year-from-dateTime($0)`, DataType.Integer, true);

class EmptyParameter extends RenderParameter {
    public plainValue() {
        return 'empty';
    }
    public renderXPath() {
        return "empty";
    }
    public getDataType() {
        return DataType.Unknown;
    }
}
class BlankParameter extends RenderParameter {
    public plainValue() {
        return '';
    }
    public renderXPath() {
        return "";
    }
    public getDataType() {
        return DataType.Blank;
    }
}

class Expression extends RenderParameter {
    public expressionType: ExpressionType;
    public parameters: {};
    private leftParenthesis: boolean;
    private rightParenthesis: boolean;
    public constructor(parent: Render, expressionType: ExpressionType = ExpressionType.None) {
        super(parent);
        this.setExpressionType(expressionType);
        this.leftParenthesis = RenderExpression[this.expressionType].startWithParenthises;
        this.rightParenthesis = RenderExpression[this.expressionType].startWithParenthises;
    }
    public plainValue() {
        return this.expressionType;
    }
    public setup(parent: Render) {
        super.setup(parent);
    }
    public getLeftParenthesis() {
        return this.leftParenthesis;
    }
    public getRightParenthesis() {
        return this.rightParenthesis;
    }
    public setLeftParenthesis(value: boolean) {
        this.leftParenthesis = value;
        this.onUpdate();
    }
    public setRightParenthesis(value: boolean) {
        this.rightParenthesis = value;
        this.onUpdate();
    }
    public myIndex() {
        if (this.getParent() instanceof Expression) {
            const expression = this.getParent() as Expression;
            Object.keys(expression.parameters).forEach((index) => {
                if (expression === this) {
                    return index;
                }
            });
            return -1;
        } else if (this.getParent() instanceof Condition) {
            const condition = this.getParent() as Condition;
            return condition.expressions.indexOf(this);
        }
    }
    public parameterIndex(parameter: RenderParameter) {
        let result = -1;
        Object.keys(this.parameters).forEach((index) => {
            if (this.parameters[index] === parameter) {
                result = parseInt(index, 10);
            }
        });
        return result;
    }
    public firstExpression() {
        return this.myIndex() === 0;
    }
    public getXPathEntity(): XPathEntity {
        if (this.getParent() instanceof Expression) {
            const expression = this.getParent() as Expression;
            return expression.getXPathEntity();
        } else if (this.getParent() instanceof Condition) {
            const condition = this.getParent() as Condition;
            return condition.getParent() as XPathEntity;
        }
    }
    public toggleLeftParenthesis() {
        this.leftParenthesis = !this.leftParenthesis;
        this.onUpdate();
        return this.leftParenthesis;
    }
    public toggleRightParenthesis() {
        this.rightParenthesis = !this.rightParenthesis;
        this.onUpdate();
        return this.rightParenthesis;
    }
    public setExpressionType(expressionType: ExpressionType) {
        if ((this.parameters === null) || (this.parameters === undefined)) {
            this.parameters = [];
        }
        this.expressionType = expressionType;
        for (let idx = 0; idx < RenderExpression[expressionType].parameterCount; idx++) {
            if ((this.parameters[idx] === null) || (this.parameters[idx] === undefined)) {
                this.parameters[idx] = new EmptyParameter(this);
            }
        }
        const currentLength = Object.keys(this.parameters).length;
        for (let idx = RenderExpression[expressionType].parameterCount; idx < currentLength; idx++) {
            delete this.parameters[idx];
        }
        const hasParenthesis = RenderExpression[this.expressionType].xpathTemplate.indexOf('(') > -1;
        this.leftParenthesis = hasParenthesis;
        this.rightParenthesis = hasParenthesis;
        this.onUpdate();
    }
    public setLiteralParameter(index: number | RenderParameter, value: string) {
        if (index instanceof RenderParameter) {
            index = this.parameterIndex(index);
        }
        if (!this.parameters[index] === undefined) {
            throw new Error(`Invalid parameter index ${index} for expression ${this.expressionType}`);
        }
        this.parameters[index] = new LiteralParameter(this, value);
        this.onUpdate();
        return this.parameters[index] as LiteralParameter;
    }
    public setEnumParameter(index: number | RenderParameter, value: string) {
        if (index instanceof RenderParameter) {
            index = this.parameterIndex(index);
        }
        if (!this.parameters[index] === undefined) {
            throw new Error(`Invalid parameter index ${index} for expression ${this.expressionType}`);
        }
        this.parameters[index] = new EnumParameter(this, value);
        this.onUpdate();
        return this.parameters[index] as EnumParameter;
    }
    public setAttributeParameter(index: number | RenderParameter, attributeName: string) {
        if (index instanceof RenderParameter) {
            index = this.parameterIndex(index);
        }
        if (this.getXPathEntity().getEntity().attributeNames.indexOf(attributeName) === -1) {
            throw new Error(`Invalid attribute "${attributeName}" for entity "${this.getXPathEntity().entityName}(${this.getXPathEntity().getEntity().attributeNames})"`);
        }
        this.parameters[index] = new XPathAttribute(this, this.getXPathEntity().getEntity().attributes[attributeName], false);
        this.onUpdate();
        return this.parameters[index] as XPathAttribute;
    }
    public setAssociationParameter(index: number | RenderParameter, associationName: string, useEntity: boolean = false) {
        if (index instanceof RenderParameter) {
            index = this.parameterIndex(index);
        }
        if (this.getXPathEntity().getEntity().associationNames.indexOf(associationName) === -1) {
            throw new Error(`Invalid association "${associationName}" for entity "${this.getXPathEntity().entityName}"`);
        }
        const newAssociation = new XPathAssociation(this, this.getXPathEntity().entityName, associationName, useEntity);
        this.parameters[index] = newAssociation;
        if (useEntity) {
            newAssociation.useEntity();
        }
        this.onUpdate();
        return this.parameters[index] as XPathAssociation;
    }
    public setTokenParameter(index: number | RenderParameter, token: Token) {
        if (index instanceof RenderParameter) {
            index = this.parameterIndex(index);
        }
        this.parameters[index] = new RenderToken(this, token);
        this.onUpdate();
        return this.parameters[index] as RenderToken;
    }
    public setEmptyParameter(index: number | RenderParameter) {
        if (index instanceof RenderParameter) {
            index = this.parameterIndex(index);
        }
        this.parameters[index] = new EmptyParameter(this);
        this.onUpdate();
        return this.parameters[index] as RenderToken;
    }
    public setBlankParameter(index: number | RenderParameter) {
        if (index instanceof RenderParameter) {
            index = this.parameterIndex(index);
        }
        this.parameters[index] = new BlankParameter(this);
        this.onUpdate();
        return this.parameters[index] as BlankParameter;
    }
    public renderXPath(): string {
        let result = RenderExpression[this.expressionType].xpathTemplate.replace(`(`, this.leftParenthesis ? `(` : ``).replace(`)`, this.rightParenthesis ? `)` : ``);
        for (let idx = 0; idx < RenderExpression[this.expressionType].parameterCount; idx++) {
            result = result.replace(`\$${idx}`, `${this.parameters[idx].renderXPath()}`);
        }
        return result;
    }
    public getDataType() {
        if (RenderExpression[this.expressionType].returnDataType === DataType.CheckExpression) {
            return this.parameters[0].getDataType();
        } else {
            return RenderExpression[this.expressionType].returnDataType;
        }
    }
    public getCondition(): Condition {
        // Uses getParent and casts as Condition
        return this.getParent() as Condition;
    }
}

class Condition extends Render {
    public expressions: Expression[];
    public constructor(xPathEntity: XPathEntity) {
        super(xPathEntity);
        this.expressions = [new Expression(this)];
    }
    public renderXPath(): string {
        let result = '';
        let firstExpressionDone = false;
        this.expressions.forEach((expression) => {
            result += `${firstExpressionDone ? ' ' : ''}${expression.renderXPath()}`;
            firstExpressionDone = true;
        });
        return `[${result}]`;
    }
    public addExpression(expressionType: ExpressionType = ExpressionType.None) {
        const expression = new Expression(this, expressionType);
        this.expressions.push(expression);
        this.onUpdate();
        return expression;
    }
    public setExpression(index: number | Expression, expressionType: ExpressionType) {
        if (index instanceof Expression) {
            index = (index as Expression).myIndex();
        }
        this.expressions[index].setExpressionType(expressionType);
        return this.expressions[index];
    }
    public removeExpression(expression: Expression | number) {
        const expressions: Expression[] = [];
        if (!(expression instanceof  Expression)) {
            expression = this.expressions[expression];
        }
        this.expressions.forEach((loopExpression) => {
            if (loopExpression !== expression) {
                expressions.push(loopExpression);
            }
        });
        this.expressions = expressions;
        this.onUpdate();
        return this.expressions;
    }
    public insertExpression(index: number, expressionType: ExpressionType = ExpressionType.None) {
        const expressions: Expression[] = [];
        for (let idx = 0; idx < index; idx++) {
            expressions.push(this.expressions[idx]);
        }
        const expression = new Expression(this, expressionType);
        expressions.push(expression);
        for (let idx = index; idx < this.expressions.length; idx++) {
            expressions.push(this.expressions[idx]);
        }
        this.expressions = expressions;
        this.onUpdate();
        return expression;
    }
    public getDataType() {
        return DataType.Boolean;
    }
    public getEntity() {
        return this.getParent() as XPathEntity;
    }
    public myIndex() {
        // Get's Condition's index
        return (this.getParent() as XPathEntity).conditions.indexOf(this);
    }
}

abstract class XPathMember extends RenderParameter {
}

class LiteralParameter extends RenderParameter {
    public constructor(parent: Render,  public value: string) {
        super(parent);
    }
    public plainValue() {
        return this.value.replace(`''`, `'`);
    }
    public getDataType() {
        const value: any = this.value;
        if ((value === undefined) || (value === null) || ((value + '').trim() === '')) {
            return DataType.Unknown;
        } else if (isNaN(value)) {
            return DataType.String;
        } else {
            if (parseFloat(this.value) !== parseInt(this.value, 10)) {
                return DataType.Decimal;
            } else {
                return DataType.Integer;
            }
        }
    }
    public renderXPath() {
        const dataType = this.getDataType();
        if (dataType === DataType.String) {
            return `'${this.value}'`.replace(/''/g, `'`);
        } else if ((dataType === DataType.Integer) || (dataType === DataType.Decimal)) {
            return this.value;
        } else {
            return " ? ";
        }
    }
    public setValue(value: string) {
        this.value = value;
        this.onUpdate();
    }
}

class EnumParameter extends RenderParameter {
    public constructor(parent: Render, public value: string) {
        super(parent);
    }
    public plainValue() {
        return `'${this.value}'`;
    }
    public getDataType() {
        return DataType.Enum;
    }
    public renderXPath() {
        const dataType = this.getDataType();
        return `'${this.value}'`.replace(/''/g, `'`);
    }
    public setValue(value: string) {
        this.value = value;
        // this.type = type;
        this.onUpdate();
    }
}

class XPathAttribute extends XPathMember {
    public constructor(parent: Render, public attribute: Attribute, public onPath: boolean) {
        super(parent);
    }
    public plainValue() {
        return this.renderXPath();
    }
    public renderXPath(): string {
        return `${this.onPath ? '/' : ''}${this.attribute.qualifiedName}`;
    }
    public getDataType() {
        return this.attribute.dataType;
    }
}

class XPathAssociation extends XPathMember {
    public entity: XPathEntity;
    public constructor(parent: Render, public fromEntityName: string, public associationName: string, public onPath: boolean) {
        super(parent);
        this.entity = null;
    }
    public plainValue() {
        return `${this.onPath ? '/' : ''}${this.associationName}${!!this.entity ? `/${this.entity.entityName}` : ''}`;
    }
    public getAssociation() {
        return domain.entities[this.fromEntityName].getAssociation(this.associationName);
    }
    public renderXPath(): string {
        if (this.entity === null) {
            return `${this.onPath ? '/' : ''}${this.associationName}`;
        } else {
            return `${this.onPath ? '/' : ''}${this.associationName}/${this.entity.renderXPath()}`;
        }
    }
    public getXPathEntity(): XPathEntity {
        let entity = this.getParent();
        while (!(entity instanceof XPathEntity)) {
            if (entity == null) {
                throw new Error("No entity found.");
            }
            entity = entity.getParent();
        }
        return entity;
    }
    public usingEntity() {
        // Returns if the association is using an entity in its path
        return !!this.entity;
    }
    public useEntity() {
        // Uses the entity on the other side of the association.
        if (this.getXPathEntity().entityName === this.getAssociation().entityFrom.qualifiedName) {
            this.entity = new XPathEntity(this, this.getAssociation().otherEntity(this.getAssociation().entityFrom.qualifiedName));
        } else {
            this.entity = new XPathEntity(this, this.getAssociation().entityFrom.qualifiedName);
        }
        this.onUpdate();
        return this.entity;
    }
    public useEntityName() {
        // Reveals just the entity name
        if (this.getXPathEntity().entityName === this.getAssociation().entityFrom.qualifiedName) {
            return this.getAssociation().entityTo.qualifiedName;
        } else {
            return this.getAssociation().entityFrom.qualifiedName;
        }
    }
    public discardEntity() {
        this.entity = null;
        this.onUpdate();
    }
    public toggleUseEntity() {
        if (this.entity === null) {
            this.useEntity();
        } else {
            this.discardEntity();
        }
    }
    public getDataType() {
        return DataType.Association;
    }
    public getAttributeAtTheEnd() {
        if (this.usingEntity()) {
            if (this.entity.hasMember() && (this.entity.member instanceof XPathAssociation)) {
                const nextAssociation = this.getXPathEntity().member as XPathAssociation;
                return nextAssociation.getAttributeAtTheEnd();
            } else if (this.entity.hasMember() && (this.entity.member instanceof XPathAttribute)) {
                const attribute = this.entity.member as XPathAttribute;
                return attribute;
            }
        }
        return null;
    }
}

class XPathEntity extends Render {
    public conditions: Condition[];
    public member: XPathMember;
    public constructor(parent: Render, public entityName: string) {
        super(parent);
        if (!(typeof(entityName) === "string")) {
            throw new Error("Not string");
        }
        this.conditions = [];
        this.member = null;
    }
    public isRoot() {
        return this.getParent() instanceof XPath;
    }
    public getEntity(): Entity {
        return domain.entities[this.entityName] as Entity;
    }
    public renderXPath(): string {
        let conditions: string = "";
        this.conditions.forEach((condition) => {
            conditions += condition.renderXPath();
        });
        if (this.member !== null) {
            conditions += this.member.renderXPath();
        }
        return this.getEntity().qualifiedName + conditions;
    }
    public addCondition() {
        const condition = new Condition(this);
        this.conditions.push(condition);
        this.onUpdate();
        return condition;
    }
    public removeCondition(condition: Condition | number) {
        const conditions: Condition[] = [];
        if (!(condition instanceof Condition)) {
            condition = this.conditions[condition];
        }
        this.conditions.forEach((loopCondition) => {
            if (loopCondition !== condition) {
                conditions.push(loopCondition);
            }
        });
        this.conditions = conditions;
        this.onUpdate();
        return this.conditions;
    }
    public hasConditions(): boolean {
        return this.conditions.length > 0;
    }
    public useMember(memberName: string) {
        if (this.isRoot()) {
            throw new Error(`Members not allowed on root entity ${this.getEntity().qualifiedName} of xpath.`);
        }
        if (this.getEntity().memberIsAttribute(memberName)) {
            this.member = new XPathAttribute(this, this.getEntity().attributes[memberName], true);
        } else {
            this.member = new XPathAssociation(this, this.getEntity().qualifiedName, memberName, true);
        }
        this.onUpdate();
        return this.member;
    }
    public hasMember() {
        return !!this.member;
    }
    public discardMember() {
        this.member = null;
        this.onUpdate();
    }
    public listMembers() {
        return this.getEntity().memberNames;
    }
    public getDataType() {
        return DataType.Entity;
    }
}

const loadClass = (obj: any, parent: any = null) => {
    // Loads the prototype class for a freshly deserialized JSON object
    if ((obj !== null) && obj !== undefined) {
        const keys = Object.keys(obj);
        if (keys.indexOf("loadClass") !== -1) {
            const klass = Deserializer[obj.loadClass];
            (Object as any).setPrototypeOf(obj, klass);
            obj.setup(parent);
            keys.forEach((key) => {
                const member = obj[key];
                if ((key !== "loadClass") && (typeof(member) === "object")) {
                    if (!Array.isArray(member)) {
                        loadClass(member, obj);
                    } else {
                        for (let idx = 0; idx < member.length; idx++) {
                            loadClass(member[idx], obj);
                        }
                    }
                }
            });
        }
    }
};

const deserialize = (json: string) => {
    const start = new Date();
    const obj = JSON.parse(json);
    loadClass(obj);
    console.log(`Loaded in ${(new Date()).getMilliseconds() - start.getMilliseconds()} milli-seconds.`);
    return obj;
};

class XPath extends Render {
    public static deserialize(json: string) {
        return deserialize(json);
    }
    public entityName: string;
    public rootEntity: XPathEntity;
    public constructor() {
        super(null);
        this.entityName = "?";
    }
    public serialize(): string {
        return JSON.stringify(this);
    }
    public setEntity(entityName: string) {
        if (domain.entityNames.indexOf(entityName) === -1) {
            throw new Error(`Invalid entity ${entityName}`);
        }
        this.entityName = entityName;
        this.rootEntity = new XPathEntity(this, entityName);
        this.onUpdate();
        return this.rootEntity;
    }
    public renderXPath(): string {
        if (this.rootEntity) {
            return "//" + this.rootEntity.renderXPath();
        } else {
            return "Select an entity first.";
        }
    }
    public getDataType() {
        return DataType.List;
    }
}

const Deserializer = {};
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

const xpaths = {};
xpaths[`XPath`] = XPath;
xpaths[`XPathEntity`] = XPathEntity;
xpaths[`XPathAttribute`] = XPathAttribute;
xpaths[`XPathAssociation`] = XPathAssociation;
xpaths[`XPathMember`] = XPathMember;
xpaths[`Entity`] = Entity;
xpaths[`Attribute`] = Attribute;
xpaths[`Association`] = Association;
xpaths[`RenderToken`] = RenderToken;
xpaths[`RenderExpression`] = RenderExpression;
xpaths[`RenderParameter`] = RenderParameter;
xpaths[`Render`] = Render;
xpaths[`EmptyParameter`] = EmptyParameter;
xpaths[`domain`] = domain;
xpaths[`ExpressionType`] = ExpressionType;
xpaths[`Expression`] = Expression;
xpaths[`Condition`] = Condition;
xpaths[`EnumParameter`] = EnumParameter;
xpaths[`BlankParameter`] = BlankParameter;
xpaths[`EmptyParameter`] = EmptyParameter;
xpaths[`LiteralParameter`] = LiteralParameter;
xpaths[`DataType`] = DataType;
xpaths[`getFriendlyRenderExpression`] = () => {
    // For drop-down. Should be moved to XPath
    const friendly: Array<{display: string, name: string, id: string, type: string}> = [];
    Object.keys(ExpressionType).forEach((key) => {
        const expression = ExpressionType[key];
        console.log(`${key}`);
        let template = RenderExpression[expression].xpathTemplate.replace("\$0", "…").replace("\$1", "…");
        if (template === '…') {
            template = `No function`;
        }
        friendly.push({display: `${template}`, name: template, type: `${expression}`, id: key});
    });
    friendly.push({display: `<span style="color: red">Remove expression</span>`, name: ``, type: `remove-expression`, id: `remove-expression`});
    return friendly;
};
window[`xpaths`] = xpaths;

define([
    "dojo/_base/declare"
], (declare) => {
    "use strict";
    const result = declare("XPath.widget.lib.Constructor", [  ], {
        //
    });
    return result;
});

require(["XPath/widget/lib/Constructor"]);
