const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://Tabassum:Tabassum@cluster0.gtnkey6.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log("Error connectiong to MongoDB", error)
})

app.listen(port, () => {
    console.log("Server is running on Port " + port)
})

const Employee = require('./models/employee')
const Attendance = require("./models/attendance.js")

//endpoint to register an employee
app.post("/addEmployee", async(req, res) => {
    try{
        const {
            employeeName,
            employeeId,
            designation,
            phoneNumber,
            dateOfBirth,
            joiningDate,
            activeEmployee,
            salary,
            address
        } = req.body
        
        //create a new employee
        const newEmployee = new Employee({
            employeeName,
            employeeId,
            designation,
            phoneNumber,
            dateOfBirth,
            joiningDate,
            activeEmployee,
            salary,
            address
        })
        await newEmployee.save()

        res.status(201).json({message: "Employee saved successfully", employee: newEmployee});
    }catch(error){
    console.log("error in adding an employee", error)
    res.status(500).json({ message : "failed to add an employee"})
    }
})

//endpoint to fetch all the employees
app.get("/employee", async(req,res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json({ message : "Failed to retrieve the employees"})
    }
})