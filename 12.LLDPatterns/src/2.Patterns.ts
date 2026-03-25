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