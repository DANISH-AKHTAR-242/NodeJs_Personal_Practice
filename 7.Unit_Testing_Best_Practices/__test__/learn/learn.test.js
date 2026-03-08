//nested describe
describe('Learn', () => {
    describe('Testing sum function', () => {
        it('should return the sum of two numbers', () => {
            expect(sum(2, 3)).toBe(5);
        });
    });
    describe('Testing subtract function', () => {
        it('should return the difference of two numbers', () => {
            expect(subtract(5, 3)).toBe(2);
        });
    });
});

// --------- Basic Jest ---------

//modifiers
//it.skip //skips the test case
//it.only //runs only the specified test case
//it.todo //marks the test case as a todo item, indicating that it needs to be implemented in the future
//it.each //allows you to run the same test case with different inputs, making it easier to test multiple scenarios without duplicating code
//describe.skip //skips the entire describe block
//describe.only //runs only the specified describe block

// ------- Jest Hooks ---------

//beforeAll //runs once before all test cases in the describe block
//afterAll //runs once after all test cases in the describe block
//beforeEach //runs before each test case in the describe block
//afterEach //runs after each test case in the describe block

// Jest Matchers
//toBe //checks for strict equality
//toEqual //checks for deep equality
//toBeNull //checks if the value is null


//----- SPY ON -------
//spyOn allows you to track calls to a function and its arguments, as well as control its return value. This is useful for testing the interactions between different parts of your code without relying on external dependencies. In this example, we will use spyOn to test the interaction between a function that fetches data from an API and a function that processes that data.
