//------------- Exo 5.2 -------------

// Liste des allbums
app.get('/album', (req, res) => {
    knex.select('*').from('albums')
        .then(albums => res.json(albums))
})

// Titres des albums pour un artiste en particulier
// Essayer avec GET /artist/8/albums (3 albums)
app.get('/artist/:id/albums', (req, res) => {
    knex
        .select('Title')
        .from('albums')
        .where('ArtistId', req.params.id)
        .then(result => {
            res.json(result);
        })
})

// Logout. Suppression du token pour le userId
app.post('/logout', async (req, res) => {
    const { userId } = req.body;
    await knex('users').where({id: userId}).update({token: ''});
    res.json({login: false})
})
//-------------------------------------------------