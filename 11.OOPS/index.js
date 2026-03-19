/**
 * object
 * 1.its a memeory blob (memory is controlled by program)
 *
 * user = {
 * name: "dan",
 * age: 20,
 * }
 *
 * 2.classes
 * 1. blueprint/map to create the objects.
 * 2. structure (properties) and behavior (methods/functions) of the objects.
 * 3. ES6 (2015) INTODUCED IN JS
 * 4. clases are just a syntatical sugar.
 *
 */

//----- ways to create objects in js -----
// 1. object literal - simple way
const user = {
  name: "dan",
  age: 20,
  start: function () {
    console.log("started");
  },
};

// 2. object constructor - schema
function NewUser(name, age) {
  // this = {} //new
  this.name = name;
  this.age = age;
  this.start = function () {
    console.log("started");
  };
}

const user1 = new NewUser("bun", 30);
console.log(user1);

//new keyword -> {}
//this keyword means context

//es6 class

class createUser {
  // responsible for creating the objects
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  start() {
    console.log("started");
  }
}

const user2 = new createUser("sam", 40);
console.log(user2);
// new -> {}

// ---- static method  and properties ------
//Static keyword: all the methods and properties are created whie reading the classes

class Math {
  PI = 3.14; // instance property
  constructor() {
    // constructor is used to initialize the object properties when an object is created.
  }
  add(x, y) {
    return x + y;
  }
  sub(x, y) {
    return x - y;
  }
}

const additionOperation = new Math(); // { PI , add, sub }
console.log(additionOperation.add(5, 3)); // Output: 8

//static keyword is mostly used in utility classes
//static member are allocated the memory when the class initiate/read

class Math2 {
  static PI = 3.14; // static property
  constructor() {
    // constructor is used to initialize the object properties when an object is created.
  }
  static add(x, y) {
    return x + y;
  }
  static sub(x, y) {
    return x - y;
  }
}

Math.add(5, 3); // Output: 8
Math.sub(5, 3); // Output: 2
// const additionOperation2 = new Math2(); // {  }
// console.log(additionOperation2.add(5, 3)); // Error: additionOperation2.add is not a function

// ------ encapsulation ------
// Encapsulation is the bundling of data (properties) and methods (functions) that operate on the data into a single unit, typically a class. It also involves restricting direct access to some of an object's components, which is a means of preventing accidental interference and misuse of the data. In JavaScript, we can achieve encapsulation using closures or by using private fields (introduced in ES2022).
//1. hide the implementation details from the user
//2. access modifiers: public, private, protected
//3.js does not support access modifiers
//4. getters and setters

// prevent invalid state -> balance should not be negative



// ------ getters and setters ------

//access modifiers: public, private, protected
// JavaScript does not have built-in support for access modifiers like public, private, and protected. However, we can achieve similar functionality using closures or by using the new private fields syntax (introduced in ES2022).
// Java -> public, private, protected, default (package-private)

class BankBalance {
  #balance = 0; // private property

  get balance() {
    return this.#balance;
  }

  set balance(amount) {
    if (amount < 0) {
      console.log("Invalid amount");
      return;
    }
    this.#balance = amount;
  }
  pay(){

  }
}

const myBalance = new BankBalance();
myBalance.balance = 1000; // Setting the balance using the setter
console.log(myBalance.balance); // Getting the balance using the getter
myBalance.balance = -500; // Attempting to set an invalid balance
console.log(myBalance.balance); // Balance remains unchanged due to invalid input


// ------ inheritance ------
// Inheritance is a fundamental object-oriented programming (OOP) concept that allows a new class (called a child or subclass) to inherit properties and methods from an existing class (called a parent or superclass). This promotes code reusability and establishes a natural hierarchical relationship between classes. In JavaScript, we can achieve inheritance using the `extends` keyword.

//extends keyword - used to create a child class that inherits from a parent class. The child class can override or add new properties and methods to the inherited ones.
//super() -> call parent construcor

/**
 * 1. in this a child class will inherit all the properties and methods of the parent class.
 * 2. we can add new properties and methods to the child class.
 * 3. we can also override the methods of the parent class in the child class.
 * 4. we can also call the parent class methods using the super keyword.
 * 5. we can also call the parent class constructor using the super keyword.
 * 6. we can also create a multi-level inheritance (a child class can be a parent class for another class)  
 */

class GovtCarSchema {
  constructor(brand, tyre, rating, airbags) {
    this.brand = brand;
    this.tyre = tyre;
    this.rating = rating;
    this.airbags = airbags;
  }
  start() {
    console.log(`${this.brand} car started`);
  }

  stop() {
    console.log(`${this.brand} car stopped`);
  }
}

class Bmw extends GovtCarSchema {
  constructor(brand, tyre, rating, airbags, model) {
    super(brand, tyre, rating, airbags); // call the parent constructor to initialize inherited properties
    this.model = model; // additional property specific to Bmw
  }

  airCondition() {
    console.log(`Air conditioning is on in ${this.brand} ${this.model}`);
  }

  // additional method specific to Bmw
  displayModel() {
    console.log(`This is a ${this.model} model of ${this.brand}`);
  }
}

const x3 = new Bmw("BMW", "Alloy", 4, 6, "X3");
x3.start(); // Inherited method from GovtCarSchema
x3.airCondition(); // Specific to Bmw
x3.displayModel(); // Specific to Bmw

// bmw -> govt car schema (level 1 inheritance)
// electric bmw -> bmw -> GovtCarSchema (multi-level inheritance)


// Abstract class - a class that cannot be instantiated and is meant to be subclassed. It can contain abstract methods (methods without implementation) that must be implemented by the subclasses. In JavaScript, we can simulate abstract classes using regular classes and throwing errors in the constructor or methods that are meant to be abstract.


//------ Interface (Abstract class with - 0% implementation) ------

class Vehicle {
  start() {
    throw new Error("start() method must be implemented");
  }
  stop() {
    throw new Error("stop() method must be implemented");
  }
}

class Car extends Vehicle {
  start() {
    console.log("Car started");
  }
  stop() {
    console.log("Car stopped");
  }
}

const myCar = new Car();
myCar.start();
myCar.stop();