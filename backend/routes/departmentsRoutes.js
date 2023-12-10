const express = require('express');
const router = express.Router();

const deptController = require("../controller/departmentController")

router.post('/create',  deptController.createDepartment)
router.put('/update/:id' , deptController.updateDepartment)
router.delete('/delete/:id', deptController.deleteDepartment )
router.get('/getAll', deptController.getAllDepartment )



module.exports = router;