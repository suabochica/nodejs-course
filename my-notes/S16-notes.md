# Section 16: Sending Emails

## 1. Intro: Testing Node.js
In this section, we will learn how to test out Node.js application. Seeting up an automated test suite makes it easy to check that your application is alway working as expected.

## 2. Jest Testing Framework
Let's setup the Jest testing framework. Jest gives you everithing you need to create a test suite for Node.js application.

First up, install the module

```
npm i jest@23.6.0 --save-dev
```

Next, create a `test` script in `package.json` the script itseld is jest. This allows you to use `nmp test` to run the Jest test suite.

Now, you will need to create a test suite using the `test` function. Jest provides various functions as global variables in your test suite files. `test` is one of them. The first argument to `test` is the name of your test case. The second argument to `test` is the test function itself.

If the test function throws an error, the test cast will fail. If the test function does not throw an error, the test case will pass.

The test case below would always pass, as no error is thrown.

```js
test('Hello World!', () =? {

});
```

The test case below would always fail, as it throws an error.

```js
test('This should fail', () => {
    throw new Error('Failure!');
});
```

### Links

+ [Jest](https://jestjs.io/)

## 3. Writing Tests and Assertions
Let's add assertions to your test cases. Assertions allow you to check if a given value is what you are expecting or not.

### Testing a Function
For this example, let's the `calculateTip` function shown below. all it does is calculate the tip for your restaurant bill.

```js
const calculateTip = (total, tipPercent = .3) => total + (total * tipPercent);

module.exports = {
    calculateTip
};

```

The test suite below, has a single test case for the `calculateTip` function. The test case itself calculates 30% tip on a $10 restaurant bill. The assertion checks that the calculated total equals $13. The assertion is made using `toBe` to check for equality.

```js
const { calculateTip } = require('../src/math')
test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})
```

### Links

+ [expect](https://jestjs.io/docs/en/expect)

## 4. Writing Your Own Tests
In this section, it’s on you to write some new test cases using what you’ve learned so far. No new information is covered. The goal is to give you experience using what was covered in previous lessons.

To validate the testing practice in our `math.js` file we will add two functions:

1. fahrenheitToCelsius(temp)
2. celsiusToFahrenheit(temp)

The idea is that we create the respective tests to assert the results of these functions.

## 5. Testing Asynchronous Code
Testing asynchronous code will be necessary to test the Express API endpoints. Before to start with this testing scenarios, we will use the asynchronous `add` function you created earlier in the course. Both test cases add up 2 to 3 and assert that the total is 5.

The callback function for the first test case accpets a `done` parameter. Ths lets Jest know that the test function contains asyncrhonous code. Jest won't determine if the test passed or failed until `done` is called. In the example below, `then` is called to run some code after the numbers are added. This is where the assertion is added and it is where `done` is called.

```js
test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(7);
        done();
    });
});
```

Your test cases can use async/await as well. The test case below is a refactored version of the test case above. The test case function is defined with `async`. `await` is used in the function to ensure that Jest waits for those asynchronous tasks to complete. Both test cases are functionally identical.

```js
test('Should add two numbers async/await', async () => {
    const sum = await add(2, 3);
    expect(sum).toBe(5);
});
```

## 6. Testing and Express Application: Part I

## 7. Testing and Express Application: Part II

## 8. Jest Setup and Teardown

## 9. Testing with Authentication

## 10. Advanced Assertions

## 11. Mocking Libraries

## 12. Wrapping up User Tests

## 13. Setup Task Test Suite

## 14. Testing with Task Data

## 15. Bonus: Extra Tests Ideas
