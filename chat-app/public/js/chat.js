const socket = io();

// Listen the 'COUNT_UPDATED' event
socket.on('COUNT_UPDATED', (count) => {
    console.log('The count has been updated', count);
});

document.querySelector('#plus-one').addEventListener('click', () => {
    console.log('Clicked');
    // Listen the 'INCREMENT' event
    socket.emit('INCREMENT');
});
