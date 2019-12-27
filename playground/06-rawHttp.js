const https = require('https');
const url = 'https://api.darksky.net/forecast/a80913de58bbd5b29fe12bc546cfe7e3/37.8267,-122.4233';

const request = https.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data = data + chunk.toString();
    });

    response.on('end', () => {
        const body = JSON.parse(data);

        console.log(body);
    });
});

request.on('error', (error) => {
    console.log('An error', error);
});

request.end();
