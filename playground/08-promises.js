const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([4, 7, 1]);
        reject("Things went wrong");
    }, 2000);
});

doWorkPromise.then((result) => {
    console.log("Success!", result);
}).catch((error) => {
    console.log("Error!", error);
});

// Promise Chaining

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject("Numbers must be non-negative");
            }

            resolve(a + b);
        }, 2000);
    });
};

// First approach: nested then, bad!
// double catch is a bad symptom.
add(1, 2).then((sum) => {
    console.log(sum);

    add(sum, 5).then((sum2) => {
        console.log(sum2);
    }).catch((e) => {
        console.log(e);
    });
}).catch((e) => {
    console.log(e);
});

// Second approach: chaining then, much better!
add(2,2).then((sum) => {
    console.log(sum);

    return add (sum, 5);
}).then((sum2) => {
    console.log(sum2);
}).catch((e) => {
    console.log(e);
});
