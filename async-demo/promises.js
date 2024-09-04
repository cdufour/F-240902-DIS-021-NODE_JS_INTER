// ----------------
const generatePromise = (message, timer) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(message);
        }, timer)
    });
}
const promiseLog = (value) => console.log(value);
// ----------------

console.log("*** START ***");
const p1 = generatePromise('promise 1', 2000);
const p2 = generatePromise('promise 2', 1000);
const p3 = generatePromise('promise 3', 1500);

p1.then(promiseLog);
p2.then(promiseLog);
p3.then(promiseLog);

// promises chaining
generatePromise('promise 4', 4000)
    .then((message) => {
        promiseLog(message);
        return generatePromise('promise 5', 2000) })
    .then(promiseLog)






