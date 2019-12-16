const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a80913de58bbd5b29fe12bc546cfe7e3/' + latitude + ',' + longitude;

    request({url: url, json: true}, (error, response) => {

        if (error) {
            callback('Unable to connect into the weather app', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback (undefined, {
                summary: response.body.daily.data[0].summary,
                temperature: response.body.currently.temperature,
                precipitationProbability: response.body.currently.precipProbability
            });
        }
    });
}

module.exports = forecast;