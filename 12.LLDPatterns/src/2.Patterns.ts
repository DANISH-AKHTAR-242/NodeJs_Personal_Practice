//check on refactoring guru
//https://refactoring.guru/design-patterns/typescript

//------------ 1.Singleton pattern ---------------------
/**
 * we can create one object and can use widely over the application
 * one point/object for whole application(Database connection, Logger, Configuration)
 *
 */

//example
class Database {
  private static instance: Database; //static instance variable to hold the single instance of the class
  private constructor() {
    //private constructor to prevent instantiation
  }
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  query(sql: string) {
    console.log(`Executing query: ${sql}`);
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); //Output: true

//--------------2.Factory pattern-----------------------
/**
 * we can create objects without exposing the instantiation logic to the client and refer to the newly created object using a common interface.
 *
 *
 */
//bad example
// in this we are violating the open-closed principle, if we want to add new notification type, we need to change the createNotification function
function createNotification(type: string, message: string) {
  if (type === "email") {
    //diffrent way of sending email
    // return new EmailNotification(message);
  } else if (type === "sms") {
    //diffrent way of sending sms
    // return new SMSNotification(message);
  }
}
const email = createNotification("email", "Hello World");
const sms = createNotification("sms", "Hello World");

//solution

class emailNotification {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
  send() {
    console.log(`Sending email notification: ${this.message}`);
  }
}

class smsNotification {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
  send() {
    console.log(`Sending sms notification: ${this.message}`);
  }
}

//factory class -> to give you objects
class NotificationFactory {
  static createNotification(
    type: string,
    message: string,
  ): emailNotification | smsNotification {
    if (type === "email") {
      return new emailNotification(message);
    } else if (type === "sms") {
      return new smsNotification(message);
    }
    throw new Error(`Unknown notification type: ${type}`);
  }
}

const email1 = NotificationFactory.createNotification("email", "Hello World");
email1.send();
const sms1 = NotificationFactory.createNotification("sms", "Hello World");
sms1.send();

//Abstract Factory pattern
/**
 * we can create families of related or dependent objects without specifying their concrete classes.
 *
 */

//-------------3.Bridge pattern----------------------
/**
 * we can decouple an abstraction from its implementation so that the two can vary independently.
 *
 *
 */

//bad example

//2 colors
//3 shapes
//total class combinations = 2*3=6
class CircleRed {
  draw() {
    console.log("Drawing a red circle");
  }
}

class CircleBlue {
  draw() {
    console.log("Drawing a blue circle");
  }
}

class circleGreen {
  draw() {
    console.log("Drawing a green circle");
  }
}

class SquareRed {
  draw() {
    console.log("Drawing a red square");
  }
}

class SquareBlue {
  draw() {
    console.log("Drawing a blue square");
  }
}

class SquareGreen {
  draw() {
    console.log("Drawing a green square");
  }
}

//solution

class redColor {
  applyColor() {
    console.log("Applying red color");
  }
}

class blueColor {
  applyColor() {
    console.log("Applying blue color");
  }
}

class greenColor {
  applyColor() {
    console.log("Applying green color");
  }
}

abstract class shape {
  color: string;
  constructor(color: string) {
    this.color = color;
  }
  draw() {
    // console.log(`Drawing a ${this.color} shape`);
  }
}

class circle extends shape {
  constructor(public color: string) {
    super(color);
  }

  draw() {
    console.log(`Drawing a ${this.color} circle`);
  }
}

class square extends shape {
  constructor(public color: string) {
    super(color);
  }

  draw() {
    console.log(`Drawing a ${this.color} square`);
  }
}

//chain of responsibility
//strategy pattern -> very widely used in real world application
//command patern -> rarely used in real world application

//adapter pattern -> rarely used in real world application
//decorator pattern -> rarely used in real world application

//-----------composite pattern----------------------
/**
 * we can compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.
 *
 * 1.tree structure -> parent-child relationship
 * 2.part-whole hierarchy -> a whole is made up of parts
 * 3.folder structure -> a folder can contain files and other folders
 *
 */

//bad example

class file {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class folder {
  name: string;
  children: (file | folder)[];
  constructor(name: string) {
    this.name = name;
    this.children = [];
  }
}

//solution

//we can use interface to define the common behavior of file and folder and then implement the interface in both file and folder classes. This way we can treat both file and folder uniformly and can create a tree structure of files and folders.
interface fileSystem {
  name: string;
  display(indent: string): void;
}

class file2 implements fileSystem {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  display(indent: string) {
    console.log(`${indent}- ${this.name}`);
  }
}

class folder2 implements fileSystem {
  name: string;
  children: fileSystem[];
  constructor(name: string) {
    this.name = name;
    this.children = [];
  }
  add(child: fileSystem) {
    this.children.push(child);
  }
  display(indent: string) {
    console.log(`${indent}+ ${this.name}`);
    this.children.forEach((child) => child.display(indent + "  "));
  }
}

const root = new folder2("root");
const file1 = new file2("file1.txt");
const file4 = new file2("file2.txt");
const subFolder = new folder2("subFolder");
const file3 = new file2("file3.txt");

root.add(file1);
root.add(file4);
root.add(subFolder);
subFolder.add(file3);
root.display("");

//---------decorator pattern----------------------
/**
 * we can attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.
 * 1. dynamic behavior -> we can add behavior to an object at runtime
 * 2. flexible alternative to subclassing -> we can add behavior to an object without creating a new class
 *
 */

//bad example
//bridge Pattern = ?
class coffee {
  cost() {
    return 5;
  }
}

class milkCoffee extends coffee {
  cost() {
    return super.cost() + 2;
  }
}

class sugarCoffee extends coffee {
  cost() {
    return super.cost() + 1;
  }
}

class milkSugarCoffee extends coffee {
  cost() {
    return super.cost() + 2 + 1;
  }
}

const coust1 = new milkCoffee();
console.log(coust1.cost()); //Output: 7
const coust2 = new sugarCoffee();
console.log(coust2.cost()); //Output: 6
const coust3 = new milkSugarCoffee();
console.log(coust3.cost()); //Output: 8

//solution
//we can use composition to add behavior to an object at runtime. We can create a decorator class that takes an object of the same type and adds behavior to it. This way we can add behavior to an object without creating a new class and can also combine multiple decorators to add multiple behaviors to an object.

interface Coffee {
  cost(): number;
}

class basicCoffee implements Coffee {
  cost() {
    return 5;
  }
}

class milkDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  cost() {
    return this.coffee.cost() + 2;
  }
}

class sugarDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  cost() {
    return this.coffee.cost() + 1;
  }
}

const basic = new basicCoffee();
console.log(basic.cost()); //Output: 5
const milk = new milkDecorator(basic);
console.log(milk.cost()); //Output: 7
const sugar = new sugarDecorator(basic);
console.log(sugar.cost()); //Output: 6
const milkSugar = new sugarDecorator(milk);
console.log(milkSugar.cost()); //Output: 8

//-----------observer pattern----------------------
/**
 * we can define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
 * 1. one-to-many dependency -> one subject can have multiple observers
 * 2. state change -> when the state of the subject changes, all its observers are notified
 * 3. automatic update -> when the state of the subject changes, all its observers are updated automatically
 *
 */

//bad example
//problem with this approach is that we are tightly coupling the product class with the observers. If we want to add new observers, we need to change the product class and also if we want to remove an observer, we need to change the product class. 
// This violates the open-closed principle and also makes the code less maintainable and less scalable.
class product {
  name: string;
  price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
  setPrice(price: number) {
    this.price = price;
    //notify observers
  }
  updateWebsite() {
    console.log(`Updating website with new price: ${this.price}`);
  }
  updateEmail() {
    console.log(`Sending email with new price: ${this.price}`);
  }
  updateNotification() {
    console.log(`Sending notification with new price: ${this.price}`);
  }
}

//solution
//we can use the observer pattern to decouple the product class from the observers. We can create a subject class that maintains a list of observers and notifies them when the state changes. This way we can add new observers without changing the product class and also remove observers without changing the product class. This follows the open-closed principle and also makes the code more maintainable and more scalable.

interface Observer {
  update(price: number): void;
}
//subject - product
class Product implements Observer {
  name: string;
  price: number;
  private observers: Observer[] = []; //list of observers
  
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  attach(observer: Observer) {
    this.observers.push(observer);
  }
  
  detach(observer: Observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }
  
  setPrice(price: number) {
    this.price = price;
    this.notifyObservers();
  }
  
  private notifyObservers() {
    for (const observer of this.observers) {
      observer.update(this.price);
    }
  }
  
  update(price: number) {
    console.log(`Product ${this.name} updated with new price: ${price}`);
  }
}

class Website implements Observer {
  update(price: number) {
    console.log(`Updating website with new price: ${price}`);
  }

}

class Email implements Observer {
  update(price: number) {
    console.log(`Sending email with new price: ${price}`);
  }
}

class Notification implements Observer {
  update(price: number) {
    console.log(`Sending notification with new price: ${price}`);
  }
}

const product1 = new Product("Laptop", 1000);
const website = new Website();
const email11 = new Email();
const notification = new Notification();

product1.attach(website);
product1.attach(email11);
product1.attach(notification);
product1.setPrice(900); //Output: Updating website with new price: 900, Sending email with new price: 900, Sending notification with new price: 900
product1.detach(email11);
product1.setPrice(800); //Output: Updating website with new price: 800, Sending notification with new price: 800


//--------------Chain of responsibility----------------------
/**
 * we can pass a request along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.
 * 1. chain of handlers -> multiple handlers that can process the request
 * 2. request processing -> each handler can process the request or pass it to the next handler
 *
 */

//bad example
//problem with this approach is that we are tightly coupling the request processing logic with the handlers. If we want to add new handlers, we need to change the request processing logic and also if we want to remove a handler, we need to change the request processing logic. This violates the open-closed principle and also makes the code less maintainable and less scalable.

function handleSupportRequest(request: string) {
  if (request === "technical") {
    console.log("Handling technical support request");
  } else if (request === "billing") {
    console.log("Handling billing support request");
  } else if (request === "general") {
    console.log("Handling general support request");
  } else {
    console.log("Unknown support request");
  }
}
handleSupportRequest("technical"); //Output: Handling technical support request
handleSupportRequest("billing"); //Output: Handling billing support request
handleSupportRequest("general"); //Output: Handling general support request
handleSupportRequest("other"); //Output: Unknown support request  

//solution
//we can use the chain of responsibility pattern to decouple the request processing logic from the handlers. We can create a handler interface that defines a method to process the request and a method to set the next handler in the chain. Each handler can implement the handler interface and decide whether to process the request or pass it to the next handler in the chain. This way we can add new handlers without changing the request processing logic and also remove handlers without changing the request processing logic. This follows the open-closed principle and also makes the code more maintainable and more scalable.


interface Handler {
  setNext(handler: Handler): void;
  handle(request: SupportRequest): void;
}

class SupportRequest {
  type: string;
  constructor(type: string) {
    this.type = type;
  }
}

class TechnicalSupportHandler implements Handler {
  private nextHandler: Handler | null = null;
  setNext(handler: Handler): void {
    this.nextHandler = handler;
  }
  handle(request: SupportRequest): void {
    if (request.type === "technical") {
      console.log("Handling technical support request");
    } else if (this.nextHandler) {
      this.nextHandler.handle(request);
    } else {
      console.log("Unknown support request");
    }
  }
}

class BillingSupportHandler implements Handler {
  private nextHandler: Handler | null = null;
  setNext(handler: Handler): void {
    this.nextHandler = handler;
  } 
  handle(request: SupportRequest): void {
    if (request.type === "billing") {
      console.log("Handling billing support request");
    } else if (this.nextHandler) {
      this.nextHandler.handle(request);
    } else {
      console.log("Unknown support request");
    }
  }
}

class GeneralSupportHandler implements Handler {
  private nextHandler: Handler | null = null;
  setNext(handler: Handler): void {
    this.nextHandler = handler;
  }
  handle(request: SupportRequest): void {
    if (request.type === "general") {
      console.log("Handling general support request");
    } else if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
     else {
      console.log("Unknown support request");
    }
}
}

//usage
const technicalHandler = new TechnicalSupportHandler();
const billingHandler = new BillingSupportHandler();
const generalHandler = new GeneralSupportHandler();

//setting up the chain of responsibility
technicalHandler.setNext(billingHandler);
billingHandler.setNext(generalHandler); 
technicalHandler.handle(new SupportRequest("technical")); //Output: Handling technical support request
technicalHandler.handle(new SupportRequest("billing")); //Output: Handling billing support request
technicalHandler.handle(new SupportRequest("general")); //Output: Handling general support request
technicalHandler.handle(new SupportRequest("other")); //Output: Unknown support request
