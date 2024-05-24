const mongoose = require("mongoose");
const {Schema} = mongoose;

const ClassSchema = new Schema({
    name: {
        type: String,
        required: [true, "The class needs a name"],
        unique: true 
    },
    day: {
        type: String,
        required: [true, "the class needs a day"]
    },
    hour: {
        type: String,
        required: [true, "the class needs a hour"]
    }, 
    minute: {
        type: String,
        required: [true, "the class needs a hour"]
    }, 
    hour_end: {
        type: String,
        required: [true, "the class needs a hour"]
    },
    minute_end: {
        type: String,
        required: [true, "the class needs a hour"]
    }
    
})
const Class =  mongoose.model("Class", ClassSchema);

module.exports = {
    Class
}