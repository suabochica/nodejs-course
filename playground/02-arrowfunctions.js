/**
 * Arrow function
 */


// const square = function (x) {
//     return x * x;
// }


const square = (x) => {
    return x * x;
}

console.log(square(2)); // Print: 4

// shorthand syntax
const squareAlt = (x) => x * x;

console.log(squareAlt(3)); // Print: 9

// Objects
const eventMethodTest = {
    name: 'Brithday Party',
    guestList: ['Tino, Pibe, Tren'],
    printGuestList() {
        console.log('Guest list for ' + this.name);

        this.guestList.forEach(function (guest) {
            console.log(guest + 'is attending' + this.name); // Print: Tino is attending undefined
        });
    }
};

eventMethodTest.printGuestList();

const event = {
    name: 'Brithday Party',
    guestList: ['Tino, Pibe, Tren'],
    printGuestList() {
        console.log('Guest list for ' + this.name);

        this.guestList.forEach((guest) => {
            console.log(guest + 'is attending' + this.name);
        });
    }
}

event.printGuestList();
