# Section 7: Web Servers

## Index
1. Intro: Web Servers
2. Hello Express
3. Serving up HTML and JSON
4. Serving up Static Assets
5. Serving up CSS, JS, Images and More
6. Dynamic Pages with Templating
7. Customizing the Views Directory
8. Advancing Templating
9. 404 Pages
10. Styling the Application: Part I
11. Styling the Application: Part II

## 1. Intro: Web Servers
Node.js is commonly used as web server to serve up websites, JSON, and more. To achieve these features, we will create a web server with Express. Once the server is up and running, users will be able to interact with your application via the browser.

## 2. Hello Express
Serving up websites and JSON data is easy with Express. So, it is time to create your web server with Express. Once the server is up and running, users will be able to interact with your application via the browser.

### Express 101
To get started, add Express to your project.

```
npm i express@4.16.4
```

Next, you can require express, you get access to a single function you can call to create a new Express application.

```js
const express = require('express');

const app express;
```

Now, `app` can be used to set up the server. Let's start but showing a message when some visits the home pages ar `localhost:3000` and the weather page at `localhost:3000/weather`

```js
app.get('', (request, response) => {
   response.send('Hello Express');
});

app.get('/weather', (request, response) => {
   response.send('Your weather');
});
```

The code above,uses `app.get` to set up a handler for an HTTP GET request. The first argument is the path to set up the handler for. The second argument is the function to run when that path is visited. Calling `response.send` in the route handler allows you to send back a message as the response. This will get shown in the browser.

The last thing to do is start the server. This is done by calling `app.listen` with the port of you want to listen on. Check the next code.

```
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});
```

If you run the app, you will see the message printing letting you know that the server is running. This process will stay running until you shut down. You can always use `ctrl + c` to terminate the process. Visit `localhost:3000` or `localhost:3000/weather` to view the messages!

```
$ node app.js
Server is up on port 3000.

### Links
+ [Express](http://expressjs.com/)
```

## 3. Serving up HTML and JSON
With the basics out of the way, it is time to serve up HTML and JSON with Express. That will let you serve up a static website or create an HTTP REST API designed to be consumed by a web or mobile application.

### Serving up HTML and JSON
Using `response.send` you can send back more than just text. `response.send` can be used to send an HTML or JSON response. The root route below sends back some HTML to be rendered in the browser. The weather route bleow send back a JSON respone.

```js
app.get('', (request, response) => {
   // Provide HTML to render in the browser
   response.send('<h1>Weather</h1>');
})

app.get('/weather', (request, response) => {
   // Provide HTML to render in the browser
   response.send({
      forecast: 'It is raining',
      location: 'Bogotá'
   });
```

### Links
+ [Express - res.send](http://expressjs.com/en/4x/api.html#res.send);

## 4. Serving up Static Assets
Exoress cab serve up all the assets needed for you website. This includes HTML, CSSS, JavaScript, images, and more. Time the serve up an entire directory with Express.

### Serving up a Static Directory
A modern website is more that just an HTML file. It is styles, scripts, images, and fonts. Everything needs to be exposed via the web server so the browser can load it in. With Express, it is easy to serve up an entire directory without needing to manually serve ip each asset. All Express needs is the path to the directory it should serve.

The example below uses Node's path module to generate the absolute path. The call to `path.join` allows you to manipulate a path by providing individual path segments. It starts with `__dirname` which is the directory path for the current script. From there, the second segment moves out of the `src` folder and into the `public ` directory.

The path is then provided to `express.static` as shown below.

```js

```

## 5. Serving up CSS, JS, Images and More

## 6. Dynamic Pages with Templating

## 7. Customizing the Views Directory

## 8. Advancing Templating

## 9. 404 Pages

## 10. Styling the Application: Part I

## 11. Styling the Application: Part II
