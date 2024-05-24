const mongoose = require("mongoose");

module.exports = {
    configureDB: () => {
        mongoose.connect("mongodb://localhost:27017/db")
        console.log(mongoose.connection.readyState);
    }
}