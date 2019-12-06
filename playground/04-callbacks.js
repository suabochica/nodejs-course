/**
  * Callbacks to handle asynchronous code
  */

setTimeout(() => {
    console.log("Two seconds passed");
}, 2000);

const names = ['Edward', 'Aplphonse', 'Winry'];
const shortNames = names.filter((name) => {
    return name.length <= 5;
})

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 10,
        };

        callback(data);

    }, 2000);
}

geocode('Shamballa', (data) => {
    console.log(data);
});

/**
 * Goal: Mess around with the callback pattern
 *
 * 1. Define an add function that accepts the correct arguments
 * 2. Use setTimeout to simulate two seconds delay
 * 3. After two seconds are up, call the callback function with the sum
 * 4. Test your work
 */


const add = (firstElement, secondElement, callback) => {
    setTimeout(() => {
        const sum = firstElement + secondElement;

        callback(sum);
    }, 2000);

}

add(1, 4, (sum) => {
    console.log(sum);
});
