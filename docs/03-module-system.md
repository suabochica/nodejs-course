# Section 03: NodeJS Module System

## Index

1. Intro: Node.js Module System
2. Importing Node.js Core Modules
3. Importing your own files
4. Importing `npm` modules
5. Printing in colors
6. Global npm Module and nodemon

## 1. Intro: Node.js Module System
The best way to get started with Node.js is to explore its modules system. The module system lets you load external libraries into your application. That will enable you to take advantage of built-in Node.js modules as well as third-party npm modules. This includes libraries for connecting to database, creating web servers, and more!


## 2. Importing Node.js Core Modules
Node.js comes with dozens of built-in modules/core modules. This core modules give you access to tools for working with the file system, making http request, creating web servers, etc. 

### Importing Node.js Core Modules
The core modules come with Node, so there is no need to install them.

The module system is built around the `require` function. This function is use to load in a module and get access to its contents. `require` is a global variable provided to all your Node.js scripts, so you can use it anywhere you like. Let is look as example the use of the File System core module:

```js
const fs = require('fs');

fs.writeFileSync('notes.txt', 'I live in Bogotá')
```

After run this script, you will notice a new `notes.txt` file in your directory. If you open it you will see "I live in Bogotá".

## 3. Importing your own files
Putting all your code in a single file makes it easy to get started with Node.js. As you add more code, you will want to stay organized and break your Node.js app into multiple scripts that all work together.

### Importing your own files
You know how to use `require` to load in built-in module. `require` can also be used to load in JavaScript files you have created. All you need to do is provide `require` with a relative path to the script you want to load. This path should start with `./` and then link to the file that needs to be loaded in.

```js
const checkUtils = require('./src/utils.js')

checkUtils()
```

> Note: After create your Node.js project you should run the `app.js` file with the next command.

```
node app.js
```

### Exporting from files
To exports function form _x_ file and import it in the _y_ file you should:

In the _x_ file use the `module.exports` function:

```js
// x.js file
const exportFunction () => {return 'export function'}

module.export = exportFunction
```

and in the _y_ file you use the `require` keword to import that function:

```js
// y.js file
const exportFunction = require('./x.js')

console.log(exportFunction)
```

## 4. Importing `npm` modules
When you install Node.js you also get npm. npm is a package manager that allows you to install and use third-party libraries in your code. This opens up a world of possibilities, as there are npm package for everything from email sending to file uploading.

### Initializing npm
Your Node.js application needs to initialize npm before npm can be used. You can run `npm init` from the root of your project to get that done. That command ask you a series of questions about the project and it will use the information to generate a `package.json` file in the root of your project. Here is an example.

```json
{
  "name": "notes-app",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified"\ && exit 1",
  },
  "author": "",
  "license": "ISC",
}
```

### Installing a npm module
Now we are ready to install an npm module. This is done using the `npm` command which was set up when Node.js was installed.

The command below installs the latest version of a module called validator, that is a library of string validators and sanitizers.

```
npm install validator
```

This command does three important things:
1. It creates a `node_modules` directory. npm uses this directory to store all the code for npm modules you have installed.
2. npm adds the modules as a dependency by listing in the `dependency` property in the `package.json`. This allow you to trach and manage the module you have installed.
3. npm creates a `package-lock.json` file. This include detailed information about the modules you have installed which helps keep things fast and secure.

You should never make change to `node_modules` or `package-lock.json`. Both are manage by npm and will get changes as you run npm command from the terminal.

### Importing an npm module
The `require` keyword also works for npm package. In this project structure the app.js file is consuming the `validator` package to do a validation over an string to check if is an URL.

```js
const validator = require('validator')

console.log(validator.isURL("https/mead.io")) // Print: true
```

+ [validator](https://www.npmjs.com/package/validator)


## 5. Printing in colors
There are npm modules for pretty much anything you would want to do with Node.js. For example **chalk** is a package to styling the terminal with colors.

+ [chalk](https://www.npmjs.com/package/chalk)

## 6. Global npm Module and nodemon
You can use npm modules from outisde of your scripts by installing them globally. Globally installed modules are designed to be used from the terminal and provide you with new command you can run.

### [Nodemon](https://www.npmjs.com/package/nodemon)
The command below installs version 1.18.5 of nodemon as a global module.

```
npm install -g nodemon@1.18.5
```

Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

To use the `nodemon` command as a replace of:

```
node app.js
```

we type:

```
nodemon app.js
```

Now the node session will open and every saved change in our project will be refresh thanks to the `nodemon` command.

A globally installed module is not added as a dependency to your project. That means you won't see it listed in `package.json` or `package-lock.json`. You also won't find its code in `node_modules`. Globally installed module are located in a special directory in your machine which is created and managed by npm.

## References

+ [FileSystem official Docs](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html)
