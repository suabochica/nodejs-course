require('../src/db/mongoose');

const Task = require('../src/models/task');

// Task.findByIdAndDelete("5e28b2d57f12445cab486728").then((task) => {
//     console.log(task);

//     return Task.countDocuments({ completed: false });
// }).then(countResult => {
//     console.log(countResult);
// }).catch((error) => {
//     console.log(error);
// });

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });

    return count;
};

deleteTaskAndCount("5e2f53295179461458076ecb").then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error);
});
