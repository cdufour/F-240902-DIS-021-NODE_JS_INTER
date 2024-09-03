const express = require('express');
const app = express();
const PORT = 3200;

// Liaison avec un moteur de rendu (template)
app.set('view engine', 'pug');

// Middlewares
app.use(express.urlencoded({ extended: true }));

// Custom middleware
function custom(req, res, next) {
    console.log(' -> custom middleware -> ');
    next();
}

//app.use(custom);

app.get('/', (req, res) => {
    res.set({
        'Content-Type': 'text/plain',
        'X-Demo': 'Header personnalisé de démonstration'
    });
    res.send('Accueil');
})

app.get('/notfound', custom, (req, res) => {
    res.status(404).send('Je ne suis pas là :(((');
})

app.get('/teams', (req, res) => {
    const title = 'Equipes';
    const content = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>${title}</title>
            </head>
            <body>
                <h1>${title}</h1>
            </body>
        </html>
    `;
    res.send(content);
})

// Exemple d'utilisation de QueryString HTTP
// /search?team=Juventus
app.get('/search', (req, res) => {
    const { team } = req.query;
    //res.set({'Content-Type':'application/json'});
    //res.send(JSON.stringify({equipe: team}));
    // alternative 2 en 1 :
    res.json({equipe: team});
})

app.get('/teams/:id', (req, res) => {
    res.send(req.params.id);
})

app.get('/paris', (req, res) => {
    //console.log(__dirname);
    // TypeError: path must be absolute or specify root to res.sendFile
    res.sendFile(__dirname + '/static/images/paris.jpg');
})

app.get('/login', (req, res) => {
    res.render('login', { 
        title: "Formulaire de login",
        active: true,
        students: ['Issa', 'Léo', 'Thierry'] 
    });
})

app.post('/login', (req, res) => {
    // console.log(req.body); 
    //renvoie undefined en l'absence du middleware express.urlencoded
    
    const { email, password } = req.body;

    if (!password || password.length < 8) {
        res.send('Bad input !');
    }

    res.render('login_submit', { email, password });

})

app.listen(PORT, () => {
    console.log('Server running on ' + PORT + '...')
})