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

const p1 = generatePromise('promise 1', 2000);
const p2 = generatePromise('promise 2', 1000);
const p3 = generatePromise('promise 3', 1500);

(async function start() {
    
    // attente de la résolution de p1 avant exploitation de p2
    // await p1.then(promiseLog);

    // autre approche possible pour récupérer les données émises à la résolution
    const promise1Msg = await p1;
    promiseLog(promise1Msg)

    p2.then(promiseLog);

})()







