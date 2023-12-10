

const express = require('express');
const router = express.Router();

const employeeController = require("../controller/employeeController")

router.get('/getAllEmployees',  employeeController.getAllEmployee)
router.get('/getEmployeeDeptWise/:id',  employeeController.getEmployeeDptWise)
router.put('/update/:id' , employeeController.updateEmployee)
router.get('/getEmployee/:id' , employeeController.getEmployee)
router.put('/assignDept', employeeController.assignDepartment )
router.delete('/deleteEmployee/:id', employeeController.deleteEmployee )

module.exports = router;