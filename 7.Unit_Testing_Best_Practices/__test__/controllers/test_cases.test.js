//it    
//describe
//expect
const { sum } = require('../../controllers/test_cases');

describe('Testing sum function', () => {
    it('should return the sum of two numbers', () => {
        expect(sum(2, 3)).toBe(5);
    });
});

//mock functions are used to simulate the behavior of real functions in a controlled way. They allow us to test the interactions between different parts of our code without relying on external dependencies. In this example, we will use a mock function to test the interaction between a function that fetches data from an API and a function that processes that data.
