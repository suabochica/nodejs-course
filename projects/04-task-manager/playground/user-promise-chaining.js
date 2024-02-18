require('../src/db/mongoose');

const User = require('../src/models/user');

// User.findByIdAndUpdate("5e2f4aa04355d2124bf78c54", { age: 30 }).then((user) => {
//     console.log(user);

//     return User.countDocuments({ age: 30});
// }).then(countResult => {
//     console.log(countResult);
// }).catch((error) => {
//     console.log(error);
// });

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });

    return count;
};

updateAgeAndCount("5e2f4aa04355d2124bf78c54", 15).then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error);
});
