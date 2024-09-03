const express = require('express');
const app = express();
const PORT = 3200;
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './data/chinook.db'
    }
});

app.get('/', (req, res) => {
    res.send('Accueil');
})

// Ressource: artist
// requêtes en lecture
app.get('/artist', (req, res) => {
    // SELECT Name FROM artists
    knex.select('Name').from('artists')
        .then(artists => res.json(artists))
})

app.get('/artist/:id', (req, res) => {
    knex
        .select('*')
        .from('artists')
        .where('ArtistId', req.params.id)
        .then(result => {
            if (result.length === 0) res.send('Aucun artiste correspondant');
            res.json(result[0]);
        })
})

// requêtes en écriture
// ToDO...

app.listen(PORT, () => {
    console.log('Server running on ' + PORT + '...')
})