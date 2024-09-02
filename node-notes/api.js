const fs = require('fs'); // module natif (core)

const NOTES_FILE = 'notes-data.json';

const fetchNotes = () => {
    let notes = fs.readFileSync(NOTES_FILE);
    return JSON.parse(notes);
}

const addNote = (title) => {
    let notes = fetchNotes();
    notes.push({title});
    saveNotes(notes);
}

const editNote = (title, newTitle) => {
    let notes = fetchNotes();

    for (let i=0; i<notes.length; i++) {
        if (notes[i].title === title) {
            notes[i].title = newTitle; // in-memory update
            saveNotes(notes); // on-disk update
            return true;
        }
    }

    return false;
}

const removeNote = (title) => {
    let notes = fetchNotes();
    let newNotes = notes.filter(note => note.title !== title);
    saveNotes(newNotes); // on-disk update
    return notes.length !== newNotes.length;
}

const saveNotes = (notes) => {
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes));
}

module.exports = { fetchNotes, addNote, editNote, removeNote }