const jwt = require('jsonwebtoken');
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './data/chinook.db'
    },
    useNullAsDefault: true
});

const authenticate = (req, res, next) => {
    const token = req.get('X-JWT');

    if (!token) return res.status(401).send('Not allowed');

    // vérification du token
    jwt.verify(token, 'secret', async (err, jwtDecoded) => {
        if (err) return res.status(401).send('Not allowed');

        //console.log(jwtDecoded); // output example: { userId: 5, iat: 1725452423 }
        const result = await knex('users').where({token}).andWhere('id',jwtDecoded.userId);
        if (result.length > 0) {
            // utilisateur portant ce token trouvé
            next();
        } else {
            return res.status(401).send('Not allowed');
        }
    })
}

module.exports = { authenticate }