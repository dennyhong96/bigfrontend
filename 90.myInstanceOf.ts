// The idea is to keep traversing up instance object's prototype chain (__proto__)
// and try to test if it links to the TargetClass's prototype
function myInstanceOf(instance: any, TargetClass: Function): boolean {
  if (!TargetClass.prototype) {
    throw new Error(
      "TargetClass is neither a class nor a Constructor Function"
    );
  }

  // Object.prototype.__proto__ is null
  if (!instance || typeof instance !== "object") return false;
  if (instance === TargetClass.prototype) return true;

  // An instance's __proto__ links to it's Class/Constructor's prototype
  // A Class/Constructor prototype's __proto__ links to the prototype of the Class/Constructor it extends
  return myInstanceOf(instance.__proto__, TargetClass);
}

/*
class A {}
class B extends A {} // same as doing B.__proto__ = A.prototype
const b = new B();

b.__proto__ -> B.prototype
b.__proto__.__proto__ -> A.prototype
b.__proto__.__proto__.__proto__ -> Object.prototype
b.__proto__.__proto__.__proto__.__proto__ -> null
*/
