const express = require('express');
const app = express();
const PORT = 3200;
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './data/chinook.db'
    },
    useNullAsDefault: true
});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticate } = require('./middleware/authenticate');


// Middleware pour décoder les body de requêtes en json
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Accueil');
})

// Ressource: artist
// requêtes en lecture
app.get('/artist', (req, res) => {
    // SELECT Name FROM artists
    knex.select('*').from('artists')
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
app.post('/artist', authenticate, (req, res) => {
    const { Name } = req.body;
    knex.insert({Name}).into('artists')
        .then(result => {
            res.json({ArtistId: result[0]})
        })
})

app.patch('/artist/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { newName } = req.body;
    const result = await knex('artists').where({ArtistId: id}).update({Name: newName});
    const message = result ? 'PATCHED' : 'NOT PATCHED';
    res.json({ArtistId: id, message});
})

// exemple de consommation d'api avec le client curl
// curl -X DELETE http://localhost:3200/artist/283
app.delete('/artist/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const result = await knex('artists').where({ArtistId: id}).del();
    const message = result ? 'DELETED' : 'NOT DELETED';
    res.json({ArtistId: id, message});
})

// authentification
app.get('/user', async (req, res) => {
    const users = await knex('users').select('*');
    res.json(users);
})

app.post('/user', (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
        const result = await knex('users').insert({email, password: hash});
        res.json({userId: result[0]});
    })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await knex('users').where({email}).select('id', 'password');
   
    if (result.length > 0) {
        const userId = result[0].id;
        const userHash = result[0].password;

        bcrypt.compare(password, userHash, (err, compareResult) => {
            if (compareResult) {
                // mots de passe identiques
                // génération d'un token (JWT)
                jwt.sign({userId}, 'secret', null, async (err, token) => {
                    // enregisrement du token en db
                    await knex('users').where({id: userId}).update({token});
                    res.set({'X-JWT': token});
                    res.json({login: true});
                })
            } else {
                res.json({login: false});
            }
        })
    } else {
        res.json({login: false});
    }
})


app.listen(PORT, () => {
    console.log('Server running on ' + PORT + '...')
})