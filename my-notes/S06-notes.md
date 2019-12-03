# Section 6: Asynchronous Node.js

## Index
1. Intro: Asynchronous Node.js
2. Asynchronous Basics
3. Call Stack, Callback Queue, and Event Loop
4. Making HTTP Requests
5. Customizing HTTP Requests
6. An HTTP Request Challenge
7. Handling Errors
8. The Callback Function
9. The Callback Abstraction
10. The Callback Abstraction Challenge
11. Callback Chaining
12. ES6 Aside: Object Property Shorthand and Destructuring
13. Destructuring and Property Shorthand Challenge
14. Bonus: HTTP Request Without a Library

## 1. Intro: Asynchronous Node.js
It is time to connect your application with the outside world. To achieve that, you should explore the asynchronous nature of Node.js. It is fundamental know how to use asynchronous programming to make HTTP API request to third-party HTTP-API. This will allow you to pull in data, like real-time weather data.

## 2. Asynchronous Basics
To explore th basics of asynchronous development, you will get preview of what asynchronous code looks like and how it is different from synchronous code.

### Async 101
When running asynchronous code, your code won't always execute in the order you might expect. To get started with asynchronous development, let's use `setTimeout`.

`setTimeout` is a function that allows you to run some code after a specific amount of time has passed. `setTimeout` accepts two arguments. The first is a callback function. This function will run after the specified amount of time has passed. The second argument is the amount of time in milliseconds to wait.

Here is an example.

```js
console.log("Starting");

setTimeout(() => {
  console.log("2 Seconds Timer");
}, 2000);

console.log("Stopping");
```

Run the script and you will see the logs in the following order.

```
$node app.js
Starting
Stopping
2 Seconds Timer
```

Notice that "Stopping" prints before "2 Seconds Timer". That is because `setTimeout`is asynchronous and non-blocking. The `setTimeout` call does not block Node.js form running other code while it is waiting for the 2 seconds to pass.

The asynchronous and non-blocking nature makes Node.js ideal for backend development. You server can wait for data from database while also processing a incoming HTTP request.

## Links
+ [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)

## 3. Call Stack, Callback Queue, and Event Loop
To understand the executions of asynchronous code in Node.js and V8 we have to put onstage the elements in the next image:

![Async Node.js](https://github.com/suabochica/nodejs-course/tree/master/assets/async-node-js.jpg)

-_Call stack:_ Stack that determines which function are being executed in the script.
-_Callback queue:__Queue that determines which function will pass to the _call stack_.
-_Event loop:_ Mechanism that continuously monitors the _callback queue_ and the _call stack_ to push the first callback function in line onto the _call stack_, as soon as the stack is empty. His job allow us asynchronous code in JavaScript.
-_Node.js APIs:_ Queue that determines which function will pass to the _call stack_.

## Links
+ [Mead Asynchronous JavaScript Slides](http://files.mead.io/87d2ba3ed9a4)

## 4. Making HTTP Requests
It is time to make HTTP request from Node. The HTTP request wil enable your app to communicate with other APIs and servers to do a wide variety of things. Everything from fetching real-time weather data to sending text messages to users.

### Making HTTP Requests
There are several libraries that make it easy to fire off HTTP requests. A recommended one is `request`. You can install it using the command below:

```
npm i request
```

Before you use the library in your app, you will need to figure out which URL you are trying to fetch. To fetch real-time weather data, you will need to sign up for a free Dark Sky API account. You can do that [here](https://darksky.net/dev)

Below is an example URL that responds with forecast data to San Francisco.

https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/37.8267,-122.4233

If you visit that URL in the browser, you will see that the response is JSON data. This same data can be fetched by our Node.js app using the request library. The example below fetches data and prints the current temperature to the console.

```js
const request = require('request')

const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/37.8267,- 122.4233'

request({ url: url }, (error, response) => {
    // Parse the response body from JSON string into JavaScript object
    const data = JSON.parse(response.body)
    // Will print the current temperature to the console
    console.log(data.currently.temperature)
})
```

### Links
+ [npm: request](https://www.npmjs.com/package/request)

## 5. Customizing HTTP Requests


## 6. An HTTP Request Challenge


## 7. Handling Errors


## 8. The Callback Function


## 9. The Callback Abstraction


## 10. The Callback Abstraction Challenge

## 11. Callback Chaining


## 12. ES6 Aside: Object Property Shorthand and Destructuring

## 13. Destructuring and Property Shorthand Challenge

## 14. Bonus: HTTP Request Without a Library
