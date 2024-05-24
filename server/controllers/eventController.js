const {Event} = require("../models/event")

const createEvent = (req, res) => {
    let data = req.body;
    let event = new Event(data);
    event.save()
        .then(() => {
            res.statusCode = 200
            res.json(req.body);
        })
        .catch((error) => {
            res.statusCode = 500
            res.json({error: error});
        })
}

const getEvents = (req, res) => {
    Event.find({})
        .then((values) => {
            res.statusCode = 200
            res.json({events: values});
        })
        .catch((error) => {
            res.statusCode = 500
            res.json({error: error});
        })
    
}

const updateEvent= (req, res) => {
    const eventId = req.params.eventId;
    const updatedData = req.body; 

    Event.findByIdAndUpdate(eventId, updatedData, { new: true })
        .then(updatedEvent => {
            res.status(200).json(updatedEvent);
        })
        .catch(error => {
            console.error('Error updating Event:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}
const deleteEvent = (req, res) => {
    const eventId = req.params.eventId;

    Event.findByIdAndDelete(eventId)
        .then(() => {
            res.status(200).json({ message: 'Event deleted successfully' });
        })
        .catch((error) => {
            console.error('Error deleting Event:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
}