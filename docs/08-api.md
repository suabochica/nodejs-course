# Section 8: Accessing API from Browser

## Index

1. Intro: Your Own API
2. The Query String
3. Building a JSON HTTP Endpoint
4. ES6 Aside: Default Function Parameters
5. Browser HTTP Requests with Fetch
6. Creating a Search Form
7. Wiring up the User Interface

## 1. Intro: Your Own API

Time to review how to set up communication between the client and the server. This will be done via HTTP requests. The goal is that the users will be able to type and address in the browser to view their forecast.

## 2. The Query String

Time to learn how to use the query strings to pass data form the client to the server. This will be used to send the address from the browsers to Node.js. Node.js will then be able to fetch the weather for the address and send the forecast back to the browser.

### Working with Query Strings

The query string is a portion of the URL that allows you to provide additional information to the server. For the weather application, the query string will be used to pass the address from the browser to the Node.js Express application.

The query string comes after the `?` in the URL. The example below uses the query string to set `address` equal to `boston`. The key/value pair is separated by `=`.

```
http://localhost:3000/weather?address=boston
```

Below is one more example where two key/value pairs are set up. The key/value pairs are separated by `&`. Here `address` is equal to `philadelphia` and `units` is equal to `us`.

```
http://localhost:3000/weather?address=philadelphia&units=us
```

The express route handler can access the query string key/value paris on `req.query`. The handler below uses `req.query.address` to get the value provided for `address`. This address can then be used to fetch weather information.

```js
app. get('/weather', (req, res) => {
    // All query string key/value pairs ar on req.query
    res.send('You provided "' + req.query.address + '" as the address.')
})
```

### Links

+ [Express req.query](http://expressjs.com/en/4x/api.html#req.query)

## 3. Building a JSON HTTP Endpoint

The weather application already has the code in place to fetch the weather for a given address. So, our goal is to wire up the route handler to fetch the weather and send it back to the browser. Please review the section six notes and the contents inside the `/weather-app` folder.

## 4. ES6 Aside: Default Function Parameters

ES6 provides a new syntax to set default values for function arguments. We will use this new syntax to improve and clean up the application code.

### Default Function Parameters

Function parameters are `undefined` unless an argument values is provided when the function is called. ES6 now allow function parameters to be configured with a custom default value.

You can see this in action in the `greeter` function below. `name` wil be `'user'` if no value is provided. `age` will be undefined if no value is provided.

```js
const greeter = (name = 'user', age) => {
    console.log('Hello' + name);
}

greeter('Edward'); // Hello Edward
greeter(); // Hello user
```

This syntax can also be used to provide default values when using ES6 destructuring. The `transaction` function below shows this off by providing a default value for `stock`.

```js
const transaction = (type, { label, stock = 0 } = {}) => {
    console.log(type, label, stock)
}

transaction('order')
transaction('order', product)
```

### Links

+ [MDN: Default Function Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)

## 5. Browser HTTP Requests with Fetch

Now the concepts of HTTP AJAX go up to the stage. With HTTP AJAX we do request from the browser. This will allow the web application to request the forecast from the Node.js server.

### The Fetch API

Web APIs provide you with a way to make HTTP requests from JavaScript in the browser. This is done using `fetch` function. `fetch` expects to be called with a URL as the first argument. It sends off the HTTP request and gives you back the response.

The `fetch` call below is used to fetch the weather from Boston. An if statement is then used to either print the forecast or the error message.

```js
fetch('http://localhost:3000/weather?address=Boston').then((reponse) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data.location);
            console.log(data.forecast);
        }
    });
});
```

### Links

+ [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
+ [Fetch Tutorial](https://developers.google.com/web/updates/2015/03/introduction-to-fetch)

## 6. Creating a Search Form

With a search form we will allow a visitor to type in their address click a button, and then see their real-time forecast information

### The Search Form

Below is an example HTML form. It contains a text input a button which can be used to submit the form.

```html
<form>
    <input placeholder="Location">
    <button>Search</button>
</form>
```

Using client-side JavaScript, you can set up an event listener that will allow you to run some code when the form is submitted. What should that code? It should grab the address from the text field, send off an HTTP request to the Node server for the data, and then render the weather data to the screen.

For the moment we will ignore the last step and instead we will log the data information in the console.

```js
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');

/**
 * Events
 ============================================================*/

 weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = searchElement.value;

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data.location);
                console.log(data.forecast);
            }
        });    
    });
})
```

## 7. Wiring up the User Interface

Finally, the information of our API is enable in the browser. Now we have to manipulate the text content of HTML element from JavaScript. That will allow the weather application to render the forecast data to the browser instead of the console.

### Rendering Dynamic textContent

Set up HTML elements for the messages you want to render. Below is an example paragraph which can be used to render some text from JavaScript. It contains no text by default. It will be updated to show some text as the client-side JavaScript runs.

```html
<p id="message-1"> </p>
```

The code below can be used to change the text content of the paragraph. First up, `document.querySelector` is used to target the element. It is used with `#`, which searches for elements by their ID. The text content can be updated by setting a value on the `textContent` property.

```js
const messageOne = document.querySelector('#message-1');

messageOne.textContent = 'My new text';
```
