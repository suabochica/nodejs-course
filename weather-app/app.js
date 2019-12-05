const request = require('request');

const url = 'https://api.darksky.net/forecast/a80913de58bbd5b29fe12bc546cfe7e3/37.8267,-122.4233';

request({url: url, json: true}, (error, response) => {
    console.log(response.body.daily.data[0].summary+ ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain');
})
