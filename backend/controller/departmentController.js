const { default: mongoose } = require("mongoose");
const { department } = require("../models/departmentModel");


exports.createDepartment = async(req,res)=>{
    try {

      console.log(req.body,"body")
        let newDept = await new department(req.body);
        const data = await newDept.save();
        res.status(201).send({ status: true, data });
    } catch (error) {
        return res.status(400).send({ status: false, msg: error });
    }
}
exports.getAllDepartment = async(req,res)=>{
    try {
        let depts = await department.find();
        res.status(201).send({ status: true, depts });
    } catch (error) {
        return res.status(400).send({ status: false, msg: "error" });
    }
}

exports.deleteDepartment = async(req,res)=>{
    const deptId = req.params.id;
  console.log(deptId, "deptId");
  if (!deptId || !mongoose.Types.ObjectId.isValid(deptId)) {
    return res.status(400).json({
      message: "Invalid deptId. Please provide a valid deptId.",
    });
  }
    try {

        const result = await department.findByIdAndDelete(deptId);
        res.status(200).send({ status: true, result });
    } catch (error) {
        return res.status(400).send({ status: false, message: "error" });
    }
}

exports.updateDepartment = async(req,res)=>{
    const deptId = req.params.id;
  console.log(deptId, "deptId");
  if (!deptId || !mongoose.Types.ObjectId.isValid(deptId)) {
    return res.status(400).json({
      message: "Invalid deptId. Please provide a valid deptId.",
    });
  }
  try {
    // const update = await Company.findByIdAndUpdate({ _id: id }, req.body);
    const result = await department.updateOne({ _id: deptId }, { $set: req.body });
    res.status(200).json({ status:true ,result});
  } catch (error) {
    console.error("Failed to fetch company details:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
}