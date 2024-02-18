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
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// Options
// -------
const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true});

// Auto Scroll
// -----------
const autoScroll = () => {
    // Get new message element
    const $newMessage = $messages.lastElementChild;

    // Get the height of the new message
    const newMessageStyles = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

    // Get the visible height
    const visibleHeight = $messages.offsetHeight;

    // Get the message container height
    const containerHeight = $messages.scrollHeight;

    // Calculate the scroll height change
    const scrollOffset = $messages.scrollTop + visibleHeight;

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight;
    };
};

// Socket Events
// -------------
socket.on('MESSAGE', (message) => {
    console.log(message);
    console.log(message.text);
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('hh:mm a')
    });

    $messages.insertAdjacentHTML('beforeend', html);
    autoScroll();
});

socket.on('LOCATION_MESSAGE', (locationMessage) => {
    console.log(locationMessage);
    const html = Mustache.render(locationMessageTemplate, {
        username: locationMessage.username,
        url: locationMessage.url,
        createdAt: moment(locationMessage.createdAt).format('hh:mm a')
    });

    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('ROOM_DATA', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    });

    document.querySelector('#sidebar').innerHTML = html;
});

// Events Listeners
// ----------------
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

socket.emit('JOIN', { username, room }, (error) => {
    if (error) {
        alert(error);
        location.href  = '/';
    }
});
