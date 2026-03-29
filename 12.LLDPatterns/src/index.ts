//What are design principles?
//
//What are our flaws
//1.Redundancy -> copying the same code everywhere
//2. One fuction mutiple responsibilities -> doing more than one thing in a function
//3. Tight coupling -> when one module is dependent on another module
//4. Low cohesion -> when a module is doing more than one thing
//5. Inflexibility -> when a module is not flexible enough to change

/**What is our goal?
 * 1. Maintainability -> easy to maintain and update the code
 * 2. Scalability -> easy to add new features without breaking the existing code (multiple projects in one repository)
 * 3.Reusability -> easy to reuse the code in other projects
 * 4.robustness -> easy to handle errors and exceptions
 */

/**Basic design principles
 * Abbreviations
 * DRY -> Don't Repeat Yourself
 * KISS -> Keep It Simple Stupid
 * YAGNI -> You Ain't Gonna Need It
 * SOLID -> Single Responsibility Principle, Open-Closed Principle, Liskov Substitution Principle, Interface Segregation Principle, Dependency Inversion Principle
 * Composition over Inheritance -> prefer composition over inheritance
 */

//KISS example
const grade = (
  s: number, //bad example
) => (s >= 90 ? "A" : s >= 80 ? "B" : s >= 70 ? "C" : s >= 60 ? "D" : "F");
const result = grade(85);
console.log(result); //Output: B
//solution
const grade2 = (s: number) => {
  if (s >= 90) return "A";
};

// composition over inheritance
//ISA, HASA
//ISA -> inheritance, HASA -> composition
//Example: A car is a vehicle (ISA), but a car has an engine (HASA). Inheritance is used to model the relationship between a car and a vehicle, while composition is used to model the relationship between a car and an engine.

class vehicle {
  make: string;
  model: string;
  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
}

class Tata extends vehicle {
  //ISA
  constructor(make: string, model: string) {
    super(make, model);
  }
}

//HASA

class human {
  name: string;
  age: number;
  gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
  canEat() {
    console.log(`${this.name} can eat`);
  }
  canSleep() {
    console.log(`${this.name} can sleep`);
  }
}

//law of demeter
//Example: A class should not know about the internal details of another class. For example, if we have a class that represents a car, it should not know about the internal details of the engine class.