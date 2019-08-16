# S04: File System and Command Line Args

With node you con run the `node` command with some additional information. For example:

```
node app.js add
```

The `add` word is and input from the user and we can get it in our javascript file via the `process` module of node:

```js
// app.js
console.log(process.argv);
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

With this command the `--title=This is my title` will the last item in the `process.argv` array. So, we can process this input with strings
handling and get customizes behaviors according to the command inputs.

# File System and Line Args

Consume the module `process.argvs`

## Argument parsing with `yargs`

Use the [`yargs`](<[https://www.npmjs.com/package/yargs](https://www.npmjs.com/package/yargs)>) package to get the user inputs inside and object structure.

`yargs` helps you build interactive command line tools, by parsing arguments and generating an elegant user interface. With `yargs` you can handle commands in the next way:

```js
yargs.command({
  command: "add",
  description: "Add a new note",
  handler: function() {
    console.log("Adding a new note");
  }
});

yargs.command({
  command: "remove",
  description: "Remove a note",
  handler: function() {
    console.log("Removing a new note");
  }
});
```

`yargs` also allow us to validate the input of the users via the `builder` property. In the case of the `add` command, we will expect that the user give us the _title_ and the _body_ of the note. You can define these entries as mandatory and also you can define the type of them. So the expected command will be:

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

## Storing Data with JSON

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

## Adding a Note

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

## Removing a Note

// TODO
