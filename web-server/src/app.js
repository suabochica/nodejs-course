const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// Define paths to Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

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
        name: 'Edward Elric',
        messageText: 'Please contact us to help you',
    });
});

app.get('/weather', (request, response) => {
    const address = request.query.address;

    if (!address) {
        return response.send({
            error: 'You must provide an address'
        });
    }

    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return response.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return response.send({
                    error
                });
            }

            response.send({
                forecast: forecastData,
                location,
                address,
            });
        });
    });
});

app.get('/products', (request, response) => {
    if (!request.query.search) {
        return response.send({
            error: 'You must provide a search term'
        })
    }
    
    response.send({
        products: [],
    });
});

app.get('/help/*', (request, response) => {
    response.render('404', {
        title: '404',
        name: 'Edward Elric',
        errorMessage: "Help page not found",
    });
});

app.get('*', (request, response) => {
    response.render('404', {
        title: '404',
        name: 'Edward Elric',
        errorMessage: 'Page not found',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
