const mongoose = require("mongoose");
const {Schema} = mongoose;

const EventSchema = new Schema({
    name: {
        type: String,
        required: [true, "The event needs a name"],
        unique: true 
    },
    date: {
        type: Date,
        required: [true, "the event needs a date"]
    },
    description: {
        type: String,
        required: [true, "the event needs a description"]
    }
    
})

const Event =  mongoose.model("Event", EventSchema);

module.exports = {
    Event
}