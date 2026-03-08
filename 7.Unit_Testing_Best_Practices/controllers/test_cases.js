const { add, subtract } = require("./test_cases");

// test_cases.test.js

describe("Calculator Functions", () => {
  describe("add", () => {
    test("should add two positive numbers", () => {
      expect(add(2, 3)).toBe(5);
    });

    test("should handle negative numbers", () => {
      expect(add(-2, 3)).toBe(1);
    });
  });

  describe("subtract", () => {
    test("should subtract two numbers", () => {
      expect(subtract(5, 3)).toBe(2);
    });
  });
});

// To run: npm test or npx jest
