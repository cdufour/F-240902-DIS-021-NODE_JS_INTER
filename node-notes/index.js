//console.log(process.argv);
const yargs = require('yargs');
const { fetchNotes, addNote, editNote } = require('./api');

const titleOption = {
    describe: 'Titre de la note',
    alias: 't',
    required: true
};

const argv = yargs
    .command('list', 'Lister les notes')
    .command('add', 'Ajouter une note', { title: titleOption })
    .command('edit', 'Modifier une note', {
        title: titleOption,
        newTitle: { describe: 'Nouveau titre', required: true }
    })
    .help()
    .argv;

const cmd = argv._[0];
//console.log(cmd)

if (cmd === 'add') {
    addNote(argv.title);
    console.log('[+] Note enregistrée')
} else if (cmd === 'list') {
    let notes = fetchNotes();
    console.log('[+] Liste des notes')
    notes.forEach(note => console.log(note.title));
} else if (cmd === 'edit') {
    let result = editNote(argv.title, argv.newTitle);
    if (result) {
        console.log('[+] Note mise à jour');
    } else {
        console.log('[-] Aucune note portant ce titre trouvée');
    }
} else {
    console.log('Commande non reconnue');
}