const express = require('express');

const app = express();

app.get('', (request, response) => {
    response.send('Hello express!');
});

app.get('/weather', (request, response) => {
    response.send('Your weather');
});

app.get('/about', (request, response) => {
    response.send('<h1>About</h1>');
});

app.get('/help', (request, response) => {
    response.send({
        forecast: 'It is raining',
        location: 'Atlantis'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
