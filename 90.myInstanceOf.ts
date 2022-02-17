export function myInstanceOf(instance: any, TargetClass: Function): boolean {
  // instance is null when new Object().__proto__.__proto__ is passed in
  if (!instance || typeof instance !== "object") return false;

  if (!TargetClass.prototype) {
    throw new Error("TargetClass is not a class nor a constructor function");
  }

  // An instance's __proto__ is the Class/Constructor's prototype
  if (instance.__proto__ === TargetClass.prototype) return true;

  return myInstanceOf(instance.__proto__, TargetClass);
}

/*
function A(name) {
  this.name = name;
}
A.prototype.eat = function () {
  console.log("eat");
};

function B(gender) {
  this.gender = gender;
}
B.prototype.drink = function () {
  console.log("drink");
};
B.prototype.__proto__ = A.prototype; // Class B extends A {}

class A {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log('eat')
  }
}
class B extends A {
  constructor(gender) {
    super();
    this.gender = gender;
  }
  drink() {
    console.log('drink')
  }
}

const a = new A("denny");
console.log(a.__proto__ === A.prototype); // true
console.log(a.__proto__.__proto__ === Object.prototype); // true
console.log(a.__proto__.constructor === A); // true

const b = new B("male");
console.log(b.__proto__ === B.prototype); // true
console.log(b.__proto__.__proto__ === A.prototype); // true
console.log(b.__proto__.constructor === B); // true
*/
