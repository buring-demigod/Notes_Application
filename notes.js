/// importing FileSystem and Chalk module.
const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return "Success!";
}

//////////////////////////////////////////////////////////////

//Helper function to addNote.
const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
}

//Helper function to addNote (take all the previous notes).
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (e) {
        return [];
    }
}

//////////////////////////////////////////////////////////////
/// function to addNotes to the system.
const addNote = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter(e => e.title === title);
    const duplicateNote = notes.find(note => note.title === title);
    if (duplicateNote) {
        console.log(chalk.bgRed("Title already used"));
        return;
    }
    notes.push({
        title: title,
        body: body,
    })
    saveNotes(notes);
    console.log(chalk.bgGreen("Note added"));
}


//////////////////////////////////////////////////////////////
//Function to remove Notes.
const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter(note => note.title !== title);
    if (notes.length === newNotes.length) {
        console.log(chalk.bgRed("note not found"));
        return;
    }
    saveNotes(newNotes);
    console.log(chalk.bgGreen("Note deleted"));
    return;
}

//////////////////////////////////////////////////////////////
//Function to List Notes.
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bgYellow("your notes"));
    notes.forEach((note, i) => {
        console.log(i + 1 + ": " + note.title);
    });
}

//////////////////////////////////////////////////////////////
//Function to read a note.
const ReadNote = function (title) {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    if (!note) {
        console.log(chalk.bgRed("Error:No note found"));
        return;
    }
    console.log(chalk.inverse(note.title));
    console.log(note.body);
    return;
}

//Exporting all the function.
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    ReadNote: ReadNote,
};