const fs = require('fs');
const chalk = require('chalk');
const getNotes = () => {
    const notes = loadNotes();
    notes.forEach((note) => {
        console.log(note.title);      
    });
}
//ADD NOTE
const addNote = (title, body) => {
    const notes = loadNotes();//Variable notes is an array

    // const duplicateNotes = notes.filter(function (note) {
    //     //Check duplicated title
    //     return note.title === title;
    // })
    // const duplicateNotes = notes.filter((note) => note.title === title);//Use arrow function
    
    //!! To debug type: node inspect app.js bla bla
    // Then open browser type chrome://inspect and click the inspect link
    // Then google dev tool will open an we can debug on there
    // When you turn off the dev tools, to open this again, type "restart" in the terminal
    debugger

    const duplicateNote = notes.find((note) => note.title === title);
    // if (duplicateNotes.length === 0) {
    if (duplicateNote === undefined) {
        //Dont find any duplicated notes
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.green.inverse("New note added!!"));
    } else {
        console.log(chalk.red.inverse("Note title was taken!!"));
    }
    
}
//REMOVE NOTE
const removeNote = (title) => {
    const notes = loadNotes();
    //Function filter() create an array an keep all the element pass the conditions
    const notesToKeep = notes.filter((note) => note.title !== title);
    
    if (notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse("Doesn't have this title!!"));
    } else {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse("Removed a note name: " + title));
    }
    
}

//LIST NOTES
const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse.blue("Your notes:"));
    notes.forEach((note) => {
        console.log(note.title);      
    });
}

//READ NOTES
const readNote = (title) => {
    const notes = loadNotes();
    const findNote = notes.find((note) => note.title === title);
    if(findNote !== undefined) {
        console.log(chalk.inverse.blue(findNote.title));
        console.log(findNote.body);
    } else {
        console.log(chalk.inverse.red("This title could not be found!"));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    //Load existing notes from file
    //Return an array
    try {//If the JSON file doesn't exist go to catch
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
    
}
//Export an obj
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};