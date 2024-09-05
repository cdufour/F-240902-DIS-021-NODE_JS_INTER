const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const PORT = 3200;

// --- Squelize ---
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/chinook.db'
});

const Artist = sequelize.define('artists', {
    ArtistId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: DataTypes.STRING
    },
    {
        createdAt: false,
        updatedAt: false
    });
//-----------------

// --- Middlewares ---
app.use(express.json());
// -------------------

// --- Routes -----
app.get('/artist', async (req, res) => {
    const artists = await Artist.findAll({attributes: ['ArtistId', 'Name'],});
    res.json(artists);
})
app.post('/artist', async (req, res) => {
    const { Name } = req.body;
    const artist = await Artist.create({ Name }, { fields: ['Name'] },);
    res.json({ArtistId: artist.ArtistId})
})
// ---------------

app.listen(PORT, async () => {
    console.log('Server running on ' + PORT + '...');

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    
})