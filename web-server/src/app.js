const path = require('path');
const express = require('express');


const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
console.log(__dirname);

app.use(express.static(publicDirectoryPath));

app.get('/weather', (request, response) => {
    response.send({
        forecast: 'It is raining',
        location: 'Atlantis'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
