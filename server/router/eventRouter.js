const express = require("express");
const { getEvents , updateEvent, deleteEvent, createEvent } = require("../controllers/eventController");
const router =  express.Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.patch("/:eventId", updateEvent);
router.delete("/:eventId", deleteEvent); 

module.exports = {
    eventRouter: router
}