const myPromise = new Promise((resolve, reject) => {
    let age = 5;
    if (age > 18) {
        resolve("eligible for vote");
    } else {
        reject("Not eligible for vote");
    }
})
myPromise.then((msg) => console.log(msg))
    .catch((error) => console.log(error))
    .finally(console.log("final block") )

