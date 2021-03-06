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
The request library offer us several options that we will review right now.

### Request Options
The request library comes with plenty of options to make your life easier. One is the `json`option. Set `json` to `true` and request will automatically parse the JSON into a JavaScript object for you.

Also, you can explore the different properties that the darksky API offer for us. You can get the currently temperature, the precipitation probability and you can retrieve forecast minutely, hourly or monthly. Some settings are put from the URL after the `?` character to indicate parameters for the request.

```js
const request = require('request')
const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/37.8267,- 122.4233'
request({ url: url, json: true }, (error, response) => {
    console.log(response.body.daily.data[0].summary + ' It is currently ' +
response.body.currently.temperature + ' degrees out. There is a ' +
response.body.currently.precipProbability + '% chance of rain.')
})
```

the above program would print:

```
$ node app.js
Mostly cloudly overnight. It is currently 51.49 degrees out. There is a 0% change of rain.
```

### Links
+ [npm request option](https://www.npmjs.com/package/request#requestoptions-callback)
+ [darksky docs](https://darksky.net/dev/docs)

## 6. An HTTP Request Challenge
It is challenge time. Here we will to integrate a geocoding API called Mapbox into the Node.js application.

Goal: Print the latitude and longitude of Los Angeles.

1. Fire off a new request to the URL explored in browser
2. Have the request module parse it as JSON
3. Print both, latitude and longitude to the terminal
4. Test your work

### Links
+ [Mapbox](https://www.mapbox.com/)

## 7. Handling Errors
There are plenty of reasons an HTTP request can fail. Maybe your machine does not have an internet connection, or maybe the URL is incorrect. Regardless of what goes wrong, it is necessary know how to handle error that occur when making HTTP requests. 

### Handling Errors
Handling errors is important. It would be nice if we could always provide the user with a forecast for their location, but that is not going to happen. When things fail, you should aim to provide users with clear an useful message in plain English to the know what is going on.

The callback function you pass to `request` expects and `error` and `response` argument to be provided. Either `error` or `response` will have a value, never both. If `error` has a value, that means things went wrong. In this case `response` will be `undefined`, as there is no response. If `response` has a value, things went well. In this case, `error` will be `undefined` as no error occurred.

The code below handle two different errors:
1. If `error` exist, the program prints a message letting the user know it was unable to connect.
2. If the error is in the inputs of the URL, the program prints a message instructing the user to try a different search.

Lastly the coordinate are printed to the console if neither error occurs.

```js
const geocodeURL =
'https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_t
oken=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.
njY7HvaalLEVhEOIghPTlw&limit=1'

request({url: geocodeURL, json: true}, (error, response) => {
    if (error) {
        console.log("Unable to connect with the geocode service");
    } else if (response.body.features.lenght === 0) {
        console.log("Unable to locate address. Please try with another search");
    } else {
        const latitude = response.body.features[0].center[1];
        const longitude = response.body.features[0].center[0];

        console.log(latitude, longitude);
    }
});
```

## 8. The Callback Function
A callback function is a functions that is passed as an argument to another function. That is it. This is something you have used before, and now we will dive a bit deeper into how they work.

### The Callback Function
Imagine you have a `functionA` which gets passed as an argument to `functionB`. `functionB` will do some work an then call `functionA` at some point in the future.

Callback functions are the core of asynchronous development. When you perform an asynchronous operation, you will provide Node with a callback function. Node will then call the callback when the asynchronous operation is complete. This is how you get access to the results of the asynchronous operation, whether it is an HTTP request for JSON data or a query to a database for a user's profile.

The example below shows how you can use the callback pattern in your own code. The `geocode` function is set up to take in two arguments. The firs is the address to geocode. The second is the callback function to run when the geocoding process is complete. Below, we simulate this request by using `setTimeout` to make the process asynchronous.

```js
const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 10,
        };

        callback(data);

    }, 2000);
}

geocode('Shamballa', (data) => {
    console.log(data);
});
```

The call to `geocode` provides both arguments, the address and the callback function. Notice that the callback function is expecting a single parameter which it has called `data`. This is where the callback function will get access to the results of the asynchronous operation. You can see where `callback` is called with the data inside the `geocode` function.

## 9. The Callback Abstraction
Imagine you want to geocode an address from multiple places in your application. You have two options:

1. Duplicate the code responsible for making the request. This includes the call to request along with all the code responsible for handling errors.
2. Create a callback function which will run once the geocoding operation is complete.

About option one, Duplicating code makes your application unnecessarily complex and difficult to maintain.

In option two, you will create a single reusable function that can be called whenever you need to geocode and address.

You can see an example below. The function `geocode` was created to serve as a reusable way to geocode an address. It contains all the logic necessary to make the request and process the response. The function `geocode` accepts two arguments. The first one is the address to geocode and the second is a callback function which will run once the geocoding operation is complete.

```js
const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;
```

Now, `geocode` can be called as many times as needed from anywhere in your application. The snippet below import `geocode` and call the function to get latitude and longitude of the address passed as argument.

```js
const geocode = require('./utils/geocode');

geocode('Boston', (error, data) => {
    console.log('error', error);
    console.log('data', data);
})
```

## 10. The Callback Abstraction Challenge

**Goal**: Create a reusable function for getting the forecast

1. Setup the forecast `function` in the utils/forecast.js
2. Require the function in app.js and call it as shown below
3. The forecast function should have three potential calls to callback
    - Low lever error, pass string for error
    - Coordinate error, pass string for error
    - Success, pass forecast string for data

```js
forecast(-75.088, 44.1545, (error, data) => {
    console.log('error', error);
    console.log('data', data);
})
```

## 11. Callback Chaining
A good action that we can set up is run one asynchronous operation only after another asynchronous operation is complete. That will allow you to use the output of from geocoding as the input for fetching the weather.

### Callback Chaining
When working with asynchronous code, you will often find out that you need to use the results from one async operation as the input for another async operation. This is something we need to do in the weather application too. Step one is to geocode the address. Step two is to use the coordinates to fetch the weather forecast. You can't start step two until step one is complete.

You can start one operation after another finishes by using _callback chaining_. Check the code below:

```js
geocode(address, (error, data) => {
    if (error) {
        return console.log(error);
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error) {
            console.log(error);
        }

        console.log(data.location)
        console.log(forecastData)
    })
});
```

First up, is the call to `geocode`. The call to `geocode` provides an address and a callback function as it did before. It is the code inside the callback function that looks a bit different. The callback function call `forecast`. This means that forecast won't get called until after `geocode` is complete. The latitude and longitude from the geocoding operation is also provided as the input for the `forecast` function call.

## 12. ES6 Aside: Object Property Shorthand and Destructuring
ES6 has done wonders making JavaScript easier to use. We will explore a couple of features that make it easier work with objects.

### Property Shorthand
The property shorthand makes it easier to define properties when creating a new object. It provides a shortcut for defining a property whose value comes from a variable of the same name. You can see this in the example below where a `user` object is created. The `name` property gets its value from a variable also called `name`.

```js
const name = 'Edward';
const userAge = 16;

const user = { 
    name,
    age: userAge,
    location: 'Amestrian'
};

console.log('user', user);
```

### Object Destructuring
Object destructuring gives you a syntax for pulling properties off of objects and into standalone variables. This is useful whe working with the same object properties throughout your code. Instead of writing `user.name` a dozen times, you could destructure the property into a `name` variable. Check the next example:

```js
const user = {
    name: 'Edward',
    age: 16,
    location: 'Amestrian'
}

// The line below uses destructuring
const { age, location:address } = user

console.log(age)
console.log(address)
```
`user` is destructured on line 8 above. The `age` property has been destructured and stored in `age`. The `location` property has been destructured and stored in `address`.

### Destructuring Function Arguments
Destructuring works with function parameters as well. If an object is passed into a function, it can be destructured inside the function definition. you can see this in the `transaction` function below. The function accepts an object as its second argument. The `label` and `stock` properties have both been destructured into standalone variables that become available in the function.

```js
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4.2
}

const transaction = (type, { label, stock = 0 } = {}) => {
    console.log(type, label, stock)
}

transaction('order', product)
```

### Links
+ [Property shorthand](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015)
+ [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

## 13. Destructuring and Property Shorthand Challenge
**Goal**: Use both, destructuring and shorthand property in weather application.

1. Use destructuring in app.js, forecast.js and geocode.js
2. Use property shorthand in forecast.js and geocode.js
3. Test your work and ensure that all works


## 14. Bonus: HTTP Request Without a Library
While the request library is great, it is not necessary if you want to make HTTP requests from Node. You can use the core http or https module of Node.json.

### The HTTPS Module
Node.js provides two core modules for making HTTP request. the `http` module can be use to make http requests and the `https` module can be used to make https requests. One great feature about request is that it provides a single module that can make both.

The code in `playground/06-raw-https.js` uses the https module to fetch the forecast from DarkSky API, Notice there is a lot more required to get things working. Separate callbacks are required for incoming chunks of data, the end of the response, and the error for the request. This means you will likely recreate your own function similar to `request` to make you life easier. It is best to stick with a tested an popular library like request.

### Links
+ [Node.js http documentation](https://nodejs.org/dist/latest-v11.x/docs/api/http.html)
+ [Node.js https documentation](https://nodejs.org/dist/latest-v11.x/docs/api/https.html)
