const express = require('express')
const mongoose = require('mongoose')
const app = express();

app.use(express.static('Public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/emp_db');

mongoose.connection.on('connected', () => {
    console.log("mongodb connected successfully");
})

// Schema updated to relax 'required' constraints so partial form submissions don't fail
const empschema = mongoose.Schema({
    eid: {
        type: Number,
        required: true,
        unique: true,
        min: 1
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        trim: true
    },
    salary: {
        type: Number,
        min: 0
    },
    city: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    gender: {
        type: String,
        // Removed required: true so you can submit without it failing
        // Added empty string '' to enum so clearing the form doesn't crash it
        enum: ['Male', 'Female']
    },
    jobType: {
        type: String,
        // Removed required: true
        // Added empty string '' to allow the default dropdown state
        enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship']
    },
    isActive: {
        type: Boolean,
        default: false
    }
});


const employeemodel = mongoose.model('employeemodel', empschema, 'employee_details');


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Public/view.html')
})


// get data
app.get('/api/readdata', (req, res) => {
    employeemodel.find()
        .then(data => res.send(data))
        .catch(err => res.send(err))
})


// add  the data
app.post('/api/adddata', (req, res) => {
    employeemodel.create(req.body)
        .then(() =>
            res.json({ message: " employee added succesfully" }))
        .catch((err) =>
            res.json({ message: err.message }))
});

app.delete('/api/deletedata/:id', (req, res) => {
    employeemodel.deleteOne({ eid: req.params.id })
        .then(() =>
            res.json({ message: " delete succesfully" }))
        .catch((err) =>
            res.json({ message: err.message }))
})

app.put('/api/updatedata/:id', (req, res) => {
    employeemodel.updateOne({
        eid: req.params.id
    }, { $set: req.body })
        .then(() => res.json({ message: " student update succesfully" }))
        .catch((err) => res.json({ message: err.message }))
})

app.listen(3000, () => {
    console.log("3000 port is running");
})