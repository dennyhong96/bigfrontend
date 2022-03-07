/**
 * A function in javascript has 3 roles;
 * 1. Constructor function to create object instances from
 * How to trigger?
 * When use new keyword (new MyFunc())
 *
 * 2. Pure function
 * How to trigger?
 * Call directly (MyFunc(), MyFunc.call(ctx, ...args))
 *
 * 3. Object
 * How to trigger?
 * Use property on the Function (MyFunc.prop1)
 */

const myExtends = (SuperType, SubType) => {
  function Inherited(...args) {
    // Call SuperType and SubType in this order
    // SuperType will set it's instance instance prop value pairs into `this`
    // Then SubType will set it's instance prop value pairs into `this`
    // SubType prop value pairs can overwrite those set from SuperType if prop name are the same
    SuperType.call(this, ...args);
    SubType.call(this, ...args);
  }
  // Makes Inherited's instances' __proto__ links to SubType.prototype
  // So Inherited's instances' can use methods on SubType.prototype
  Inherited.prototype = SubType.prototype;
  // Makes  SubType.prototype's __proto__ links to SuperType.prototype
  // So Inherited's instances' can use methods on SuperType.prototype
  Inherited.prototype.__proto__ = SuperType.prototype;

  // Makes Inherited class' __proto__ links to SuperType class
  // So Inherited class have acess to SuperType class's static members
  Inherited.__proto__ = SuperType;

  // Makes SuperType class' __proto__ links to SubType class
  // So Inherited class have acess to SubType class's static members
  Inherited.__proto__.__proto__ = SubType;

  return Inherited;
};

// Example
function SuperType(name) {
  this.name = name;
  this.forSuper = [1, 2];
  this.from = "super";
}
SuperType.prototype.superMethod = function () {};
SuperType.prototype.method = function () {};
SuperType.staticSuper = "staticSuper";

function SubType(name) {
  this.name = name;
  this.forSub = [3, 4];
  this.from = "sub";
}
SubType.prototype.subMethod = function () {};
SubType.prototype.method = function () {};
SubType.staticSub = "staticSub";

const ExtendType = myExtends(SuperType, SubType);
const instance = new ExtendType("test");
console.log(instance);
