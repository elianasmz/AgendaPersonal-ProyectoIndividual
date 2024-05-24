const express = require("express");
const { getClasses, createClass, updateClass, deleteClass } = require("../controllers/classController");
const router =  express.Router();

router.get("/", getClasses);
router.post("/", createClass);
router.patch("/:classId", updateClass);
router.delete("/:classId", deleteClass); 

module.exports = {
    classRouter: router
}