# Section 03: NodeJS Module System


## Index

1. Intro: Node.js Module System
2. Importing Node.js Core Modules
3. Importing your own files
4. Importing `npm` modules
5. Printing in colors

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
The `require` keyword also works for npm package. In this project structure the app.js file is consuming the `validator` package to do a validation over an string to check if is an URL.

### [Nodemon](https://www.npmjs.com/package/nodemon)
nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

To use the `nodemon` command as a replace of:

```
node app.js
```

we type:

```
nodemon app.js
```

Now the node session will open and every saved change in our project will be refresh thanks to the `nodemon` command.

References
-
+ [FileSystem official Docs](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html)
