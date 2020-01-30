require('../src/db/mongoose');

const Task = require('../src/models/task');

Task.findByIdAndDelete("5e28b2d57f12445cab486728").then((task) => {
    console.log(task);

    return Task.countDocuments({ completed: false });
}).then(countResult => {
    console.log(countResult);
}).catch((error) => {
    console.log(error);
});
