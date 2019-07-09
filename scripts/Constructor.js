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
var DataType;
(function (DataType) {
    DataType["String"] = "String";
    DataType["Integer"] = "Integer";
    DataType["Boolean"] = "Boolean";
    DataType["Float"] = "Float";
})(DataType || (DataType = {}));
var DataItem = /** @class */ (function () {
    function DataItem(qualifiedName) {
        this.qualifiedName = qualifiedName;
        this.module = qualifiedName.split('.')[0];
        this.name = qualifiedName.split('.').reverse()[0];
    }
    return DataItem;
}());
var Attribute = /** @class */ (function (_super) {
    __extends(Attribute, _super);
    function Attribute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Attribute;
}(DataItem));
var Association = /** @class */ (function (_super) {
    __extends(Association, _super);
    function Association() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Association;
}(DataItem));
var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Entity;
}(DataItem));
var DomainModel = /** @class */ (function () {
    function DomainModel() {
        this.entityNames = Object.keys(mx.meta.getMap()).sort();
        console.log("Entities: " + this.entityNames);
    }
    return DomainModel;
}());
var XPath = /** @class */ (function () {
    function XPath() {
    }
    return XPath;
}());
