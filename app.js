// imports
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

//customize yards verion

yargs.version('1.1.0')

//add,remove,read,list commands.

//add command.
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        body: {
            describe: "Body of Note",
            demandOption: true,
            type: 'string'
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

//remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'title of the note to be remove',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

//list command.
yargs.command({
    command: 'list',
    describe: 'listing of all notes',
    handler() {
        notes.listNotes();
    }
})

//Read command
yargs.command({
    command: 'read',
    describe: 'read',
    builder: {
        title: {
            describe: "Title of the note",
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.ReadNote(argv.title);
    }
});
yargs.parse();
