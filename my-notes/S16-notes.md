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

+ [Jest(https://jestjs.io/)

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

## 5. Testing Asynchronous Code

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
