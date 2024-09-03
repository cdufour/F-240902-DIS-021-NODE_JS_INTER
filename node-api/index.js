const express = require('express');
const app = express();
const PORT = 3200;

app.get('/', (req, res) => {
    res.send('Accueil');
})

app.listen(PORT, () => {
    console.log('Server running on ' + PORT + '...')
})