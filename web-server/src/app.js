const path = require('path');
const express = require('express');


const app = express();

// Define paths to Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather',
        name: 'Edward Elric'
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About Me',
        name: 'Edward Elric'
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help Me',
        name: 'Edward Elric'
    });
});

app.get('/weather', (request, response) => {
    response.send({
        forecast: 'It is raining',
        location: 'Atlantis'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
