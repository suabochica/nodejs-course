const socket = io();

// Listen the 'COUNT_UPDATED' event
// socket.on('COUNT_UPDATED', (count) => {
//     console.log('The count has been updated', count);
// });

// Elements
// --------
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $messages = document.querySelector('#messages');
const $sendLocationButton = document.querySelector('#send-location');

// Templates
// ---------
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;

socket.on('MESSAGE', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        message
    });

    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('LOCATION_MESSAGE', (url) => {
    const html = Mustache.render(locationMessageTemplate, {
        url
    });

    $messages.insertAdjacentHTML('beforeend', html);
});

// document.querySelector('#plus-one').addEventListener('click', () => {
//     console.log('Clicked');
//     // Listen the 'INCREMENT' event
//     socket.emit('COUNT_INCREMENTED');
// });

$messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled');
    const message = event.target.elements.message.value;

    socket.emit('SEND_MESSAGE', message, (error) => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        if (error) {
            return console.log(error);
        }

        console.log('Message delivered!');
    });
});

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Your browser not supports geolocation');
    }

    $sendLocationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        socket.emit('SEND_LOCATION', latitude, longitude, () => {
            $sendLocationButton.removeAttribute('disabled');
            console.log('Location shared!');
        });
    });
});
