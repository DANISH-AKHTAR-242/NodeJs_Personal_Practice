//1.manual testing
// Manual testing involves testing the application manually by executing the code and verifying the output. In this example, we will test a simple add function that takes two numbers and returns their sum.
function add(a, b) {
  return a + b;
}
//2.Unit testing
// Unit testing involves testing individual functions or components in isolation to ensure they work as expected. In this example, we will write unit tests for the add function.
function testAdd() {
  // Test case 1: Positive numbers
  if (add(2, 3) !== 5) {
    console.error("Test case 1 failed");
  }
  // Test case 2: Negative numbers
  if (add(-2, -3) !== -5) {
    console.error("Test case 2 failed");
  }
  // Test case 3: Mixed numbers
  if (add(-2, 3) !== 1) {
    console.error("Test case 3 failed");
  }
  // Test case 4: Zero
  if (add(0, 0) !== 0) {
    console.error("Test case 4 failed");
  }
  console.log("All test cases passed");
}
testAdd();

//3.Integration testing
// Integration test means testing the interaction between multiple functions or modules to ensure they work together as expected. In this example, we will test the interaction between the add and multiply functions.
function multiply(a, b) {
  return a * b;
}
function calculate(a, b) {
  return add(a, b) * multiply(a, b);
}
function testCalculate() {
  // Test case 1: Positive numbers
  if (calculate(2, 3) !== 25) {
    console.error("Test case 1 failed");
  }
  // Test case 2: Negative numbers
  if (calculate(-2, -3) !== 25) {
    console.error("Test case 2 failed");
  }
  // Test case 3: Mixed numbers
  if (calculate(-2, 3) !== 1) {
    console.error("Test case 3 failed");
  }
  // Test case 4: Zero
  if (calculate(0, 0) !== 0) {
    console.error("Test case 4 failed");
  }
  console.log("All test cases passed");
}
testCalculate();

//4. End to end testing
// End-to-end testing involves testing the entire application flow from start to finish to ensure that all components work together as expected. In this example, we will simulate a simple user interaction with a web application.
function login(username, password) {
  // Simulate a login function that checks the username and password
  if (username === "user" && password === "pass") {
    return "Login successful";
  } else {
    return "Login failed";
  }
}
function testLogin() {
  // Test case 1: Valid credentials
  if (login("user", "pass") !== "Login successful") {
    console.error("Test case 1 failed");
  }
  // Test case 2: Invalid credentials
  if (login("user", "wrongpass") !== "Login failed") {
    console.error("Test case 2 failed");
  }
  // Test case 3: Empty credentials
  if (login("", "") !== "Login failed") {
    console.error("Test case 3 failed");
  }
  console.log("All test cases passed");
}
testLogin();

//A/B testing
// A/B testing involves comparing two versions of a web page or application to determine which one performs better. In this example, we will simulate an A/B test for a simple landing page.

//load testing
// Load testing involves testing the performance of an application under heavy load to ensure it can handle a large number of users. In this example, we will simulate a load test for a simple API endpoint.

//stress testing
// Stress testing involves testing the application under extreme conditions to identify its breaking point. In this example, we will simulate a stress test for a simple API endpoint by sending a large number of requests in a short period of time.