const socket = io();

// Listen the 'COUNT_UPDATED' event
// socket.on('COUNT_UPDATED', (count) => {
//     console.log('The count has been updated', count);
// });



socket.on('WELCOME_MESSAGE', (message) => {
    console.log(message);
});

socket.on('MESSAGE', (message) => {
    console.log(message);
});

// document.querySelector('#plus-one').addEventListener('click', () => {
//     console.log('Clicked');
//     // Listen the 'INCREMENT' event
//     socket.emit('COUNT_INCREMENTED');
// });

document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const message = event.target.elements.message.value;

    socket.emit('SEND_MESSAGE', message);
});


document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Your browser not supports geolocation');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        socket.emit('SEND_LOCATION', latitude, longitude);
    });
});
