// Exo multapp
const yargs = require('yargs');

const valueOption = {
    describe: 'Valeur',
    alias: 'v',
    required: true
};

const maxOption = {
    describe: 'Seuil maximal',
    alias: 'm',
    required: false
}

const argv = yargs
    .command('table', 'Génère table de multiplication', { 
        value: valueOption,
        max: maxOption
    })
    .help()
    .argv;

const cmd = argv._[0];

function generateTable(value, max) {
    for (let i=0; i<max+1; i++) {
        console.log(`${value} x ${i} = ${value * i}`)
    }
}

if (cmd === 'table') {

    let { value, max } = argv;
    //console.log(typeof value);

    if (typeof value !== 'number') {
        console.log("La valeur doit un être un Number");
        process.exit(1);
    }
    
    if (value < 1 || value > 100) {
        console.log("Impossible de produire la table pour la valeur: " + value);
        process.exit(1);
    }

    if (!max) {
        generateTable(value, 10);
    } else {
        generateTable(value, max);
    }
    
} else {
    console.log("Commande non comprise")
}