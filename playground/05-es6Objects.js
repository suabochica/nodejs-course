/**
  * Object's shorthand: if the name of the key is same of the variable that store the value, you can use the variable name as key.
  */
const name = "Edward";
const userAge = 16;

const user = { 
    name,
    age: userAge,
    location: "Amestrian"
};

console.log('user', user);

/**
  * Object's destructuring: A legible syntax to access to the object properties
  * 1. Alias over the keys: {label:productLabel, price } = product;
  * 2. Default values: {label:productLabel, price, rating = 5 } = product;
  * 3. Inline object destructuring in a function.
  */

const product = {
    label: "Red notebook",
    price: 3,
    stock: 201,
    salePrice: undefined,
};

// Old syntax
const labelOld = product.label;
const priceOld = product.price;

console.log('ln 30', labelOld);
console.log('ln 31', priceOld);

// Destructuring syntax
const {label, price} = product;

console.log('ln 36', label);
console.log('ln 37', price);

const transaction = (type, {label, price}) => {
    console.log(type, label, price);
}

transaction('order', product);