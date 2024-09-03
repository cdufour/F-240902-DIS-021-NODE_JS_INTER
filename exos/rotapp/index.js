const yargs = require('yargs');

const argv = yargs
    .command('rot', 'Lancer la cryptographie par rotation de caractère', {
        offset: { describe: 'Nombre de rotations de caractère', required: true },
        message: { describe: 'Message sur lequel lancer la cryptographie', required: true },
    })
    .help()
    .argv;

let newMessage = argv.message

for (let i=0; i<argv.message.length; i++) {
    newMessage = 
        newMessage.substring(0, i) + 
        String.fromCharCode(newMessage[i].charCodeAt() + argv.offset) + 
        newMessage.substring(i + 1)
        ;
}

console.log(newMessage)