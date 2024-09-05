// https://www.tutorialspoint.com/nodejs/nodejs_streams.htm

var fs = require("fs");
var data = '';

// Create a readable stream
var readerStream = fs.createReadStream('loup.jpg');

// Set the encoding to be utf8. 
//readerStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
    console.log('chunk');
    //data += chunk;
});

readerStream.on('end',function() {
   //console.log(data);
   console.log('fichier lu')
});

readerStream.on('error', function(err) {
   console.log(err.stack);
});

console.log("Program Ended");