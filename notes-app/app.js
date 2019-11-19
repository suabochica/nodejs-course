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
            demmandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note body',
            demmandOption: true,
            type: 'string',

        }
    },
    handler(args) {
        notes.addNote(args.title, args.body);
    }
});

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demmandOption: true,
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
    }
});

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler() {
        console.log('Reading a note');
    }
});
