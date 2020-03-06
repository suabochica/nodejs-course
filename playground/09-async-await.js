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

const doWorkAsync = async () => {
    const sum_one = await add(13, 21);
    const sum_two = await add(sum_one, 34);
    const sum_three = await add(sum_two, 55);

    return sum_three;
};

doWorkAsync().then((result) => {
    console.log("result", result);
}).catch((error) => {
    console.log("error", error);
});
