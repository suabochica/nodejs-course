console.log("Somos los prietos");

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((result) => {
        console.log(result);
    }).catch((error) => {
       console.log(error); 
    });
});


const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const locationParagraph = document.querySelector('#location');
const forecastParagraph = document.querySelector('#forecast');

/**
 * Events
 ============================================================*/

 weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = searchElement.value;


    locationParagraph.textContent = 'Loading...';
    forecastParagraph.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationParagraph.textContent = data.error;
            } else {
                locationParagraph.textContent = data.location;
                forecastParagraph.textContent = data.forecast;
            }
        });    
    });
})
