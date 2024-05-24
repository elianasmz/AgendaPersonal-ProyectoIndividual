const mongoose = require("mongoose");
const {Schema} = mongoose;

const TaskSchema = new Schema({
    name: {
        type: String,
        required: [true, "The student needs a first name"],
        minlength: [3, "Project name must be at least 3 characters long"],
        unique: true 
    },
    date: {
        type: Date,
        required: [true, "the task needs a date"]
    } 
})

const Task =  mongoose.model("Task", TaskSchema);

module.exports = {
    Task
}