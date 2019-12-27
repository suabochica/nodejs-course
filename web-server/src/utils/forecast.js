const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a80913de58bbd5b29fe12bc546cfe7e3/' + latitude + ',' + longitude;

    request({url, json: true}, (error, { body }) => {

        if (error) {
            callback('Unable to connect into the weather app', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback (
                undefined, 
                body.daily.data[0].summary +' It is currently '+ body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain'
            );
        }
    });
}

module.exports = forecast;
