const yargs = require('yargs');
const notes = require('./notes.js');

// Customize yargs version
yargs.version('1.1.0');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',

        },
    },
    handler(args) {
        notes.addNote(args.title, args.body);
    },
});

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(args) {
        notes.removeNote(args.title);
    }
});

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        console.log('Listing out all notes');
        notes.listNotes();
    }
});

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(args) {
        console.log('Reading a note');
        notes.readNote(args.title);
    }
});

yargs.parse()