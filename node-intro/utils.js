const getMaxValue = (notes) => {
    let max = notes[0];
    for (let i=1; i<notes.length; i++)
        if (notes[i] > max) max = notes[i];

    return max;
}

const PI = 3.14;

module.exports = { getMaxValue }