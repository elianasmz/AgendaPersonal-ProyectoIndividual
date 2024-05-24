const {Task} = require("../models/task")

const createTask = (req, res) => {
    let data = req.body;
    let task = new Task(data);
    task.save()
        .then(() => {
            res.statusCode = 200
            res.json(req.body);
        })
        .catch((error) => {
            res.statusCode = 500
            res.json({error: error});
        })
}

const getTasks = (req, res) => {
    Task.find({})
        .then((values) => {
            res.statusCode = 200
            res.json({tasks: values});
        })
        .catch((error) => {
            res.statusCode = 500
            res.json({error: error});
        })
    
}

const updateTask= (req, res) => {
    const taskId = req.params.taskId;
    const updatedData = req.body; 

    Task.findByIdAndUpdate(taskId, updatedData, { new: true })
        .then(updatedTask => {
            res.status(200).json(updatedTask);
        })
        .catch(error => {
            console.error('Error updating Task:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}
const deleteTask = (req, res) => {
    const taskId = req.params.taskId;

    Task.findByIdAndDelete(taskId)
        .then(() => {
            res.status(200).json({ message: 'Task deleted successfully' });
        })
        .catch((error) => {
            console.error('Error deleting task:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}