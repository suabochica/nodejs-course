S04: File System and Command Line Args
=

With node you con run the `node` command with some additional information. For example:

```
node app.js add
```

The `add` word is and input from the user and we can get it in our javascript file via the `process` module of node:

```js
// app.js
console.log(process.argv)
// ['/usr/local/Cellar/node/10.1.0/bin/node', nodejs-course/notes-app/app.js', add,]
```

As you can see the log `process.arg` object give us three values:
1. The path where is installed node
2. The path where the node command was executed
3. Tha additional info (`add`) give by the user

We can get this value and use it in our code to trigger a particular logic.

Moreover, we can add other parameters as user inputs, check the next command:

```
node app.js add --title=This is my title
```

With this command the `--title=This is my title` will the last item in the `process.argv` array. So, we can process this input with strings handling and get customizes behaviors according to the command inputs.