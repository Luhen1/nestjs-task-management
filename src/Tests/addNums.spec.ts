// pure functions is the easiest to test
function addNums(num1, num2) {
    return num1 + num2;
}

// describe recieves 2 arguments. in this case. you are describing what you are testing
describe('addNumbers', () => {
    // the it recieves 2 arguments. you specifify what you are testing inside the describe block. it should add 2 numbers
    it('adds two numbers', () => {
        // the expect is what the value should be when a function executes
        expect(addNums(2,2)).toEqual(4) // Your expecting that function addNum with values, 2 and 2 be equal to 4.
    });
});

// if someone broken your code by adding a minus sign instead of plus sign. you can be sure that 
