# Section 04: File System and Command Line Args

## Index

1. Intro: File System and Command Line
2. Getting input from users
3. Argument parsing with `yars` part one
4. Argument parsing with `yars` part two
5. Storing data with JSON
6. Adding a note
7. Remove a note
8. ES6 Aside: arrow functions
9. Refactoring using arrow functions
10. Listing notes

## 1. Intro: File System and Command Line
To create the notes-app we will learn to use the file system and command line arguments. Along the way, we will lear how to get input from the user, work with JSON and create a place to store user data.

## 2. Getting input from users
For a single useful application you need to get input from the users. Getting input is essential for creating real-worl apps. So, for this notes app we will learn how to set up command line arguments that allow users to pass data into it.


### Accessing Command Line Arguments
Command line arguments values are passed into your application from the terminal. Your Node.js application can access the command line arguments that were provided using `process.argv`. This array contains at least two items. The first item is the path to the Node.js executable. The second is the path to the JavaScript file that was executed. Everyting after that is a command line argument.

Let's see an example.

```js
const command = process.argv[2]

if(command === 'add') {
  console.log('Adding note!')
} else if (command === 'remove') {
  console.log('Remove note!')
}
```

That script grabs the third item in `process.argv`. Since the first two are always provided, the third item is the first command line argument that was passed in. The script uses the value of that argument to figure out what it should do. A user could provide `add` to add a note or `remove` to remove a node.

The command below runs the script and provide `add` as the command line arguments.

```
$ node app.js add
Adding note!
```

The `add` word is and input from the user and we can get it in our javascript file via the `process` module of node:

```js
// app.js
console.log(process.argv); // Print: ['/usr/local/Cellar/node/10.1.0/bin/node', nodejs-course/notes-app/app.js', add,]
```

As you can see the log `process.argv` object give us three values:

1. The path where is installed node
2. The path where the node command was executed
3. The additional info (`add`) give by the user

We can get this value and use it in our code to trigger a particular logic.

Moreover, we can add other parameters as user inputs, check the next command:

```
node app.js add --title=This is my title
```

With this command the `--title=This is my title` will the last item in the `process.argv` array. So, we can process this input with strings handling and get customizes behaviors according to the command inputs.

### Links
+ [process.argv](https://nodejs.org/api/process.html#process_process_argv)

## 3. Argument parsing with `yars` part one
Node.js provides a bare-bones way to access command line arguments. While it is a good start, it does not provide any way to parse more complex command line arguments. `yargs` is an alternative to easily set up a more complex set of arguments for your application.

### Setting up Yargs
Firs, install Yargs in your project.

```
npm install yargs@12.0.2
```

Now, yargs can be used to make it easier to work with the command line arguments. The example below shows how this can be done. First, `yargs.version` is used to set up a version for the command line tool. Next, `yargs.command` is used to add support for a new command.

```js
const yargs = require('yargs')

yargs.version('1.1.0')

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  handler: function () {
    console.log('Adding a new note!')
  }
})

console.log(yargs.argv)
```

Now, this command can be triggered by providing its name as a command line argument.

```
$ node app.js add
Adding note!
```

Yargs provides a couple of useful commands by default. The first, shown below, lets a user get the version of the command line tool they are running.


```
$ node app.js add --version
1.1.0
```

The next one, shows the user auto generated documentation that covers how the tool can be used. This would list out all available commands as well as the available options for each command.


```
$ node app.js add --help
```

### Links
+ [npm: yargs](https://www.npmjs.com/package/yargs)

## 4. Argument parsing with `yargs` part two
The goal is continue to exploring yargs to allow user to pass in the tile and body of their notes using command line options. This same technique could be used to allow user to pass in data such as their name, email or address.

### Adding Command options
Options are additional pieces of information passed along with the command. You can set up options for a command using the a yargs property.

`yargs` allow us to validate the input of the users via the `builder` property. In the case of the `add` command, we will expect that the user give us the _title_ and the _body_ of the note. You can define these entries as mandatory and also you can define the type of them. So the expected command will be:

```
node app.js add --title="Some title" --body="Some body"
```

An also we want the next rules over these parameters:

- Both will be mandatory
- Both will be strings

To achieve that the code will be:

```js
yargs.command({
	command: 'add',
	description: 'Add a new note',
	builder: {
		title: {
			describe: "Title's note",
			demandOption: true,
			type: 'string',
		},
		body: {
			describe: "Body's note",
			demandOption: true,
			type: 'string',
		},
	}
	handler: function() {
		console.log('Adding a new note')
	}
})
```

## 5. Storing Data with JSON

**JSON** (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate.

It is important that exist a difference between a JavaScript Object and JSON. Let's see it in the next:

```js
const book = {
  title: "The ego is the enemy",
  author: "Ryan Holiday"
};
```

the `book` variable is a JavaScript object. So, we can access to the `title` property via the dot notation.

```json
{
  "title": "The ego is the enemy",
  "author": "Ryan Holiday"
}
```

the code above is a JSON representation of a book. here we can't access to the tittle and the author information. At the moment of try it we will get `undefined`.

However, we can transform a JavaScript to a JSON.

```js
const dataBuffer = fs.readFileSync("data.json");
const dataJSON = dataBuffer.toString(dataBuffer);
const data = JSON.parse(dataJSON);

data.name = "Sergio";
data.age = 28;

const dataUpdatedJSON = JSON.stringify(data);
fs.writeFileSync("data.json", dataUpdateJSON);
```

### Links
+ [JSON format](https://www.json.org/)

## 6. Adding a Note

To add a note we could follow the next tasks:

1. Define the data structure of the note: `Object`
2. Define the data structure for the set of notes: `An array of objects`
3. An action to add a note
4. An action to load the notes
5. An action to save the notes

So, with this scheme in mind lets start to implement the code. Let's start with the _add note action_. In this function, first we have to load the notes. This task will be do by another function that will be discussed later.

Then we will check if the notes have duplicate titles. if we have duplicate notes, the note will be ignore. if not, we will push the note in the data structures set of notes with help of the save note task. The next code illustrate the description.

```js
const addNote = function(title, body) {
  const notes = loadNotes();

  /**
   * Validate if a note has a duplicated title
   **/
  const duplicateNotes = notes.filter(function(note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title,
      body
    });
    saveNotes(notes);

    console.log("Note note added!");
  } else {
    console.log("Note title taken!");
  }
};
```

Time to check the _save notes_ task. This will be a function that receive the notes array as parameter and then, will `stringify` it to get this content and via `fs.writeFileSync()` create the `notes.json` file.

```js
const saveNotes = function(notes) {
  const DataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", DataJSON);
};
```

Finally, go in deep with then _load notes_ task. This function will validate if the `notes.json` file exist. If it is the case, it will return the content in a JSON, if not is will return and empty array.

```js
const loadNotes = function() {
  try {
    const dataBuffer = fs.resdFileSync("notes.json");
    const dataJSON = dataBuffer.toString();

    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};
```

To test all this code Run the command:

    npm app.js add --title="t" --body="b"

This command will create and the `notes.json` file with the next body:

```json
[{ "title": "t", "body": "b" }]
```

## 7. Removing a Note

// TODO
