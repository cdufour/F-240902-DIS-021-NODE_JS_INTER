const bcrypt = require('bcrypt');

bcrypt.hash('toto', 10, (err, hash) => {
    console.log(hash);
})

bcrypt.hash('azerty', 10, (err, hash) => {
    console.log(hash);
})