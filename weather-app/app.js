const request = require('request');

const url = 'https://api.darksky.net/forecast/a80913de58bbd5b29fe12bc546cfe7e3/37.8267,-122.4233';

request({url: url, json: true}, (error, response) => {
    console.log(response.body.daily.data[0].summary+ ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain');
});

const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic291amlyb21hcGJveCIsImEiOiJjazN0NXZ0bHcwZWtlM21scXk2OTZraHJsIn0.dKnpqid-bYfPmrt2PW-XWg";

request({url: geocodeURL, json: true}, (error, response) => {
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];

    console.log(latitude, longitude);
});
