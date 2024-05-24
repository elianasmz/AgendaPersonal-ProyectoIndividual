const mongoose = require("mongoose");
const {Schema} = mongoose;


const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "The user needs a first name"]
    },
    email: {
        type: String,
        required: [true, "The user needs a email"]
    },
    password: {
        type: String,
        required: [true, "The user needs a password"]
    }/*,
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]*/
})

const User =  mongoose.model("Users", UserSchema);

module.exports = {
    User
}