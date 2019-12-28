console.log("Somos los prietos");

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((result) => {
        console.log(result);
    }).catch((error) => {
       console.log(error); 
    });
});

fetch('http://localhost:3000/weather?address=melgar').then((response) => {
    response.json().then((data) => {
         if (data.error) {
            console.log(data.error);
        } else {
            console.log(data.location);
            console.log(data.forecast);
        }
    });    
});