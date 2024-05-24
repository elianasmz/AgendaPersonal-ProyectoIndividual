const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: "http://localhost:3000"}))


const {configureDB} = require("./config/mongo");
configureDB();

const {oAuthRouter} = require("./router/oauthRouter");
app.use("/", oAuthRouter);

const {taskRouter} = require("./router/taskRouter");
app.use("/task/", taskRouter);

const {eventRouter} = require("./router/eventRouter");
app.use("/events/", eventRouter);

const {classRouter} = require("./router/classRouter");
app.use("/class/", classRouter);

app.listen(5000, () => {
    console.log("Exito: app escuchando en puerto 5000")
})