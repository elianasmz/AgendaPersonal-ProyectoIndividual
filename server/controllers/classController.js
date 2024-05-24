const {Class} = require("../models/class")

const createClass = (req, res) => {
    let data = req.body;
    let class_ = new Class(data);
    class_.save()
        .then(() => {
            res.statusCode = 200
            res.json(req.body);
        })
        .catch((error) => {
            res.statusCode = 500
            res.json({error: error});
        })
}

const getClasses = (req, res) => {
    Class.find({})
        .then((values) => {
            res.statusCode = 200
            res.json({classes: values});
        })
        .catch((error) => {
            res.statusCode = 500
            res.json({error: error});
        })
    
}

const updateClass= (req, res) => {
    const classId = req.params.class_Id;
    const updatedData = req.body; 

    Class.findByIdAndUpdate(classId, updatedData, { new: true })
        .then(updatedClass => {
            res.status(200).json(updatedClass);
        })
        .catch(error => {
            console.error('Error updating class:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}
const deleteClass = (req, res) => {
    const classId = req.params.classId;

    Class.findByIdAndDelete(classId)
        .then(() => {
            res.status(200).json({ message: 'Class deleted successfully' });
        })
        .catch((error) => {
            console.error('Error deleting Class:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

module.exports = {
    createClass,
    getClasses,
    updateClass,
    deleteClass
}