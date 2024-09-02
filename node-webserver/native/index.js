const http = require('http'); // module natif (core)
const fs = require('fs');

http.createServer((req, res) => {

    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain', 'X-Demo': 'Simple demo'});
        res.end('Je suis un serveur Nodejs natif');
    } else if (req.url === '/help') {
        res.end('En quoi puis-je t\'aider');
    } else if (req.url === '/styles.css') { 
        fs.readFile('./static/styles.css', (err, data) => {
            if (err) res.end('error');
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(data);
        })
    } else {
        res.writeHead(404);
        res.end('Ressource introuvable');
    }

    
}).listen(3200)