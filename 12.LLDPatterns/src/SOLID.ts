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

