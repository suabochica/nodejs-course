const greeter = (name = 'user', age) => {
    console.log('Hello' + name);
}

greeter('Edward'); // Hello Edward
greeter(); // Hello user
