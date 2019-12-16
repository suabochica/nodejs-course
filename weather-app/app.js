const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2];

if (! address) {
    return console.log('Please provide an address');
} else {
    geocode(address, (error, data) => {
        if (error) {
            return console.log('error', error);
        }
    
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return console.log('error', error);
            }
           
            console.log(data.location);
            console.log('forecastData', forecastData);
        });
    });
}

/**
 * Code commented because the request function was abstracted in the utils folder.

const url = 'https://api.darksky.net/forecast/a80913de58bbd5b29fe12bc546cfe7e3/37.8267,-122.4233';

request({url: url, json: true}, (error, response) => {

    if (error) {
        console.log("Unable to connect into the weather app");
    } else if (response.body.error) {
        console.log("Unable to find location");
    } else {
        const summary = response.body.daily.data[0].summary;
        const temperature = response.body.currently.temperature;
        const precipitationProbability = response.body.currently.precipProbability;

        console.log(summary + ' It is currently ' + temperature + ' degrees out. There is a ' + precipitationProbability + '% chance of rain');
    }
});
 */


 /**
 * Code commented because was abstracted in the utils folder.
const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic291amlyb21hcGJveCIsImEiOiJjazN0NXZ0bHcwZWtlM21scXk2OTZraHJsIn0.dKnpqid-bYfPmrt2PW-XWg";

request({url: geocodeURL, json: true}, (error, response) => {
    if (error) {
        console.log("Unable to connect with the geocode service");
    } else if (response.body.features.length === 0) {
        console.log("Unable to locate address. Please try with another search");
    } else {
        const latitude = response.body.features[0].center[1];
        const longitude = response.body.features[0].center[0];

        console.log(latitude, longitude);
    }
});
*/

