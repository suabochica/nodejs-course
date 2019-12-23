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
```

### Links
+ [Express](http://expressjs.com/)

## 3. Serving up HTML and JSON
With the basics out of the way, it is time to serve up HTML and JSON with Express. That will let you serve up a static website or create an HTTP REST API designed to be consumed by a web or mobile application.

### Serving up HTML and JSON
Using `response.send` you can send back more than just text. `response.send` can be used to send an HTML or JSON response. The root route below sends back some HTML to be rendered in the browser. The weather route bleow send back a JSON respone.

```js
app.get('', (request, response) => {
   // Provide HTML to render in the browser
   response.send('<h1>Weather</h1>');
});

app.get('/weather', (request, response) => {
   // Provide HTML to render in the browser
   response.send({
      forecast: 'It is raining',
      location: 'Bogotá'
   });
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
const path = require('path');
const express = require('express');


const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
console.log(__dirname);

app.use(express.static(publicDirectoryPath));

app.get('/weather', (request, response) => {
    response.send({
        forecast: 'It is raining',
        location: 'Atlantis'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
```

Start the server, and the browser will be able to access all assets in the public directory.

### Links
+ [Path](https://nodejs.org/dist/latest-v11.x/docs/api/path.html)

## 5. Serving up CSS, JS, Images and More
It is time to use the Express server to serve up a webpage with images, styles, and scripts.

### Serving up CSS, JS, Images and More
All files in `public` are exposed via the Express server. This is where your site assets need to live. If they are not in `public`, then they are not public and the browser won't be able to load them correctly. The HTML file below shoes how you can use a CSS file , JavaScrip file and image in your website.

```html
<!DOCTYPE>

<html>
    <head>
      <link rel="stylesheet" href="/css/styles.css">
      <script src="/js/app,js"></script>
    </head>

    <body>
        <h1>About</h1>
        <img src="/img/me.png">
    </body>
</html>
```

## 6. Dynamic Pages with Templating
Your web pages don't have to be static. Express supports templating engines that allow you to render dynamic HTML pages. So we will use Handlebars as templating engine for express.

### Setting up Handlebars
Start by installing Handlebars in your project.

```
npm i hbs@4.0.1
```

From there, you will need to use `app.set` to set a value for the `view engine` config option. The value is the name of the template engine module you installed. That is `hbs`.

```js
app.set('view engine', 'hbs');
```

### Rendering Handlebars Templates
By default Express expects your views to live in a `views` directory inside your project root. You will learn how to customize the location and directory names in the next section.

Below is an example handlebars view in `views/index.hbs`. This looks like a normal HTML document with a few new features. Notice `{{title}}` and `{{name}}`. This is a Handlebars syntax which allows you to inject variables inside of the template. This is what allows you to generate dynamic pages.

```html
<!DOCTYPE>

<html>
    <head>
      <link rel="stylesheet" href="/css/styles.css">
      <script src="/js/app,js"></script>
    </head>

        <h1>{{title}}</h1>
        <p>Created by {{name}}</p>
    </body>
</html>
```
Now, you can render the template. This is done by defining a new route and calling `res.render` with the template name. The `.hbs` file extension can be let off. The second argument is an object that contains all the variables the template should have access to when rendering. This is where values are provided for `title` and `name`.

```js
app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather',
        name: 'Edward Elric'
    });
});
```
### Links
+ [Handlebars](https://handlebarsjs.com/)
+ [npm:hbs](https://www.npmjs.com/package/hbs)


## 7. Customizing the Views Directory
If you don't save your handlebars files inside a `views` folder, that is the default folder where express will fetch the views, when you load the localhost in the browser you will get an error. To customize the location of the views directory, you have to provide to Express a path with the new location and call the `app.set` to set a values for the `views` option. The example below configures Express to look for views in `templates/views`

```js
const viewsPath = path.join(__dirname, '../templates/views');
app.set('views', viewsPath);
```

### Links
+ [Express API](https://expressjs.com/en/api.html)

## 8. Advancing Templating
It is time to work with Handlebars partials. As the name suggest, partials are just part of the web pages and are great for things you need to show on multiple pages like headers, footers, and navigation bars.

### Setting up Partials
You can use partials by telling Handlebars where you would like to store them. This is done with a call to `hbs.registerPartials`. It expects to get called with the absolute path to the partials directory.

```js
const hbs = require('hbs');
...

const partialPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

...
```

### Using Partials
Partials are created with the "hbs" file extension. Partials have access to all the same features as you Handlebars templates. The header partial below renders the title followed by a list of navigation links which can be shown at the top of every page.

```html
{{!-- header.hbs --}}
<h1>{{title}}</h1>

<div>
    <a href="/">Weather</a>
    <a href="/about">About</a>
    <a href="/help">Help</a>
</div>
```

The partial can then be rendered on a page using `{{>header}}` where "header" comes from the partial file name. If the partial was `footer.hbs`, it could be rendered using `{{>footer}}`.

```html
<!DOCTYPE>

<html>
    <head>
      <link rel="stylesheet" href="/css/styles.css">
      <script src="/js/app,js"></script>
    </head>

    <body>
        {{>header}}
    </body>
</html>
```

## 9. 404 Pages
Time to set up a 404 page. The 404 page will show when a user tries to visit a page that does not exist.

### Setting up a 404 Page
Express has support for `*` in route paths. This is a special character which matches anything. This can be used to create a route handler that matches all requests.

The 404 page should be set up just before call to `app.listen`. this ensures that requests for valid pages still get the correct response. The code below send the object with the information that you can show in a 404 page.

```js
app.get('*', (request, response) => {
    response.render('404', {
        title: '404',
        name: 'Edward Elric',
        errorMessage: 'Page not found',
    });
});
```

## 10. Styling the Application: Part I

## 11. Styling the Application: Part II
