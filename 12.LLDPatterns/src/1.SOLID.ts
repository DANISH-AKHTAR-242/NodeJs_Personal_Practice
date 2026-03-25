//SOLID

//S -> Single Responsibility Principle
//Example: A class should have only one reason to change. If a class has more than one responsibility, it becomes difficult to maintain and update the code. For example, a class that handles both user authentication and user profile management should be split into two separate classes.

class User {
  //bad example
  name: string;
  email: string;
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
  //responsibility 1
  getName() {
    return this.name;
  }
  //responsibility 2
  sendWelcomeEmail() {
    //send email logic
    console.log(`Welcome email sent to ${this.email}`);
  }
  //responsibility 3
  updateProfile(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
//solution
class EmailNotification {
  email: string;
  constructor(email: string) {
    this.email = email;
  }
  sendWelcomeEmail() {
    //send email logic
    console.log(`Welcome email sent to ${this.email}`);
  }
}

class userServiceResponsibility {
  saveUser(name: string, email: string) {
    //save user logic
    console.log(`User ${name} saved with email ${email}`);
  }
  updateProfile(name: string, email: string) {
    //update user logic
    console.log(`User ${name} updated with email ${email}`);
  }
}

const userx = new User("x", "x@example.com");
const userService = new userServiceResponsibility();
userService.saveUser(userx.name, userx.email);
userService.updateProfile(userx.name, userx.email);
const emailNotification = new EmailNotification(userx.email);
emailNotification.sendWelcomeEmail();

//O -> Open-Closed Principle
//Example: A class should be open for extension but closed for modification. This means that we should be able to add new functionality to a class without changing the existing code. For example, if we have a class that calculates the area of different shapes, we should be able to add new shapes without modifying the existing code.

class PaymentProcessor {
  //bad example
  process(amount: number, method: string) {
    if (method === "credit card") {
      //process credit card payment
      console.log(`Processing credit card payment of ${amount}`);
    } else if (method === "paypal") {
      //process paypal payment
      console.log(`Processing paypal payment of ${amount}`);
    }
    //modifying the existing code to add new payment method
    else {
      throw new Error("Invalid payment method");
    }
  }
}
//credit card payment
const iceCreamPayment = new PaymentProcessor();
iceCreamPayment.process(10, "credit card");

//solution
//abstract class

interface PaymentMethod {
  processPayment(amount: number): void;
}

class CreditCardPayment implements PaymentMethod {
  processPayment(amount: number) {
    //process credit card payment
    console.log(`Processing credit card payment of ${amount}`);
  }
}

class PaypalPayment implements PaymentMethod {
  processPayment(amount: number) {
    //process paypal payment
    console.log(`Processing paypal payment of ${amount}`);
  }
}

class PaymentProcessorOpenClosed {
  process(amount: number, method: PaymentMethod) {
    method.processPayment(amount);
  }
}
//credit card payment
const paymentProcessor = new PaymentProcessorOpenClosed();
paymentProcessor.process(10, new CreditCardPayment());

// L -> Liskov Substitution Principle
//Example: Subtypes must be substitutable for their base types. This means that if a class is a subtype of another class, it should be able to replace the base class without affecting the correctness of the program. For example, if we have a class that represents a rectangle and a class that represents a square, the square class should be able to replace the rectangle class without causing any issues.

class bird {
  fly() {
    console.log("Flying");
  }
}

class penguin extends bird {
  //bad example
  fly(): void {
    throw new Error("Penguins cannot fly");
  }
}

function implFlyBird(bird: bird) {
  bird.fly(); //this will throw an error if we pass a penguin
}

//solution
interface IBird {
  move(): void;
}
class flyingBird implements IBird {
  move(): void {
    console.log("Flying");
  }
}
class sparrow extends flyingBird {
  //good example
}
class penguin1 implements IBird {
  move(): void {
    console.log("Swimming");
  }
}

function makeBirdFly(bird: IBird) {
  bird.move(); //this will work for all birds, including penguins
}

//I -> Interface Segregation Principle
//Example: Clients should not be forced to depend on interfaces they do not use. This means that we should create specific interfaces for different clients instead of having a single interface that includes all the methods. For example, if we have an interface for a worker, we should create separate interfaces for different types of workers instead of having a single interface that includes all the methods.
//large interfaces should be broken down
//a class should implements only those methods that it actually uses.

//bad example
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}
//Human worker
//robot worker like in warehouses

class HumanWorker implements Worker {
  work(): void {
    console.log("Working");
  }
  eat(): void {
    console.log("Eating");
  }
  sleep(): void {
    console.log("Sleeping");
  }
}

class RobotWorker implements Worker {
  work(): void {
    console.log("Working");
  }
  eat(): void {
    throw new Error("Robots do not eat");
  }
  sleep(): void {
    throw new Error("Robots do not sleep");
  }
}

//solution
interface IWorker {
  work(): void;
}
interface IHumanWorker extends IWorker {
  eat(): void;
  sleep(): void;
}
interface IRobotWorker extends IWorker {
  //no additional methods needed
}

//D -> Dependency Inversion Principle
//Example: High-level modules should not depend on low-level modules. Both should depend on abstractions. This means that we should depend on interfaces or abstract classes instead of concrete implementations.

//DB service -> MYSQL
//User Service -> depends on DB service

//bad example
class MysqlDBService {
  //problem: user service is tightly coupled to MysqlDBService, if we want to change the DB service, we need to change the user service as well
  connect() {
    console.log("Connecting to MySQL database");
  }
  query(sql: string) {
    console.log(`Executing SQL query: ${sql}`);
  }

  save(user: string) {
    console.log("Saving user");
  }
}

class userSerive {
  dbService: MysqlDBService;
  user: string;
  constructor(db: MysqlDBService, user: string) {
    this.dbService = db;
    this.user = user;
  }

  saveUser() {
    this.dbService.save(this.user);
  }
}

//solution

interface DatabaseService {
  //curd operations
  connect(): void;
  query(sql: string): void;
  save(user: string): void;
}

class mysqlDBService1 implements DatabaseService {
  connect() {
    console.log("Connecting to MySQL database");
  }
  query(sql: string) {
    console.log(`Executing SQL query: ${sql}`);
  }
  save(user: string) {
    console.log("Saving user");
  }
}

class mongoDBService implements DatabaseService {
  connect() {
    console.log("Connecting to MongoDB database");
  }
  query(sql: string) {
    console.log(`Executing MongoDB query: ${sql}`);
  }
  save(user: string) {
    console.log("Saving user");
  }
}

class userSerive1 {
  dbService: mysqlDBService1;
  user: string;
  constructor(db: mysqlDBService1, user: string) {
    this.dbService = db;
    this.user = user;
  }
  saveUser() {
    this.dbService.save(this.user);
  }
}
