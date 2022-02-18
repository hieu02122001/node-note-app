const notes = require('./notes.js')
const yargs = require('yargs');
//Use: node app.js --help to see all custom command

//Custom Yargs version
yargs.version('1.1.0');

//Create Add command
yargs.command({
    command: 'add',//Name of the command
    describe: 'Add a new note.',//The command's describtion
    builder: {
        //node app.js add --title="..."
        title: {
            describe: 'Note title',
            demandOption: true,//To require this argument
            type: 'string',//Type of this argument
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {//Things will happen when call that command
        notes.addNote(argv.title, argv.body);
    }
})
//Create Remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note.',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})
//Create List command
yargs.command({
    command: 'list',
    describe: 'List all the notes.',
    handler() {
        notes.listNotes();
    }
})
//Create Read command
yargs.command({
    command: 'read',
    describe: 'Read a note!',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})

yargs.parse();//Go through the process and parse the arguments to the cmd
