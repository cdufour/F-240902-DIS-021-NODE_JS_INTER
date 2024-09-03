const http = require('http'); // module natif (core)
const fs = require('fs');

http.createServer((req, res) => {

    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain', 'X-Demo': 'Simple demo'});
        res.end('Je suis un serveur Nodejs natif');
    } else if (req.url === '/cities') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        const content = `
            <html>
                <head>
                    <title>Cities</title>
                </head>
                <body>
                    <h1>Cities</h1>
                    <ul>
                        <li>
                            <a href="/img/paris.jpg">Paris</a>
                        </li>
                        <li>
                            <a href="/img/rome.jpg">Rome</a>
                        </li>
                    </ul>
                    <div>
                        <img src="/img/paris.jpg" alt="Paris" width="200" />
                    </div>
                </body>
            </html>`;
        res.end(content);
    } else if (req.url === '/styles.css') { 
        fs.readFile('./static/styles.css', (err, data) => {
            if (err) res.end('error');
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(data);
        })
    } else if (req.url.startsWith('/img/')) {
        const fileName = req.url.split('/img/')[1];
        fs.readFile(`./static/images/${fileName}`, (err, data) => {
            if (err) res.end('error');
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data);
        })
    } else {
        res.writeHead(404);
        res.end('Ressource introuvable');
    }

    
}).listen(3200)