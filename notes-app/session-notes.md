S03: NodeJS Module System
=

Command to run the `app.js` file

```
node app.js
```

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

The `require` keyword also works for npm package. In this project structure the app.js file is consuming the `validator` package to do a validation over an string to check if is an URL.

References
-
+ [FileSystem official Docs](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html)