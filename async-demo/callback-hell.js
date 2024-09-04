// --- Async functions ---
function fn1(value, cb) {
    setTimeout(() => cb(value), 2000);
}

function fn2(value, cb) {
    setTimeout(() => cb(value), 5000);
}

function fn3(value, cb) {
    setTimeout(() => cb(value), 6000);
}
// ---------------------

console.log('*** START ***');
fn1('Call', (message) => {
    console.log('fn1 => message: ' + message); // fn1 => message: Call
    const newMessage = message + 'back'; // Callback
    fn2(newMessage, (message) => {
        console.log('fn2 => message: ' + message); // fn2 => message: Callback
        const newMessage = message + ' Hell !'; // Callback Hell !
        fn3(newMessage, (message) => {
            console.log('fn3 => message: ' + message); // fn3 => message: Callback Hell !
        })
    })
})
console.log('*** STOP ***');


