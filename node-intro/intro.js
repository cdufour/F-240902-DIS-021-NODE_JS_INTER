const { getMaxValue } = require('./utils');

console.log("*** Intro Nodejs ***");
const notes = [4,12,20,3,0,11];

function average(notes) {
    let total = 0;
    notes.forEach(note => total += note);
    return total / notes.length;
}

console.log(`Moyenne des notes: ${average(notes)}`);
console.log(`Valeur maximale: ${getMaxValue(notes)}`);