const express = require("express");
const { getTasks , updateTask, deleteTask, createTask } = require("../controllers/taskController");
const router =  express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask); 

module.exports = {
    taskRouter: router
}