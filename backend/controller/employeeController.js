const { default: mongoose } = require("mongoose");
const { User } = require("../models/userModel");

exports.getAllEmployee = async (req, res) => {
  try {
    let employees = await User.find({ role: "employee" });
    console.log(req.query, "query");
    if (req.query.filter === "name_ascending") {
      console.log("working1");
      employees = employees.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (req.query.filter === "name_descending") {
      console.log("working2");
      employees = employees.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (req.query.filter === "location_ascending") {
      employees = employees.sort((a, b) =>
        a.addresses.localeCompare(b.addresses)
      );
    }
    if (req.query.filter === "location_descending") {
      employees = employees.sort((a, b) =>
        b.addresses.localeCompare(a.addresses)
      );
    }
    console.log(employees, "employees");
    if (req.query._page && req.query._limit) {
      const pageNum = parseInt(req.query._page, 10);
      const pageSizeNum = parseInt(req.query._limit, 10);
      const skip = (pageNum - 1) * pageSizeNum;
      employees = employees.splice(skip, pageSizeNum);
    }
    let totalDocs = await User.find({ role: "employee" });

    return res.status(200).send({
      status: true,
      data: employees,
      totalDocs: totalDocs.length,
      msg: "got employee Successfully !!!",
    });

    // return res.status(200).send({ status: true, employees });
  } catch (error) {
    return res.status(400).send({ status: false, msg: error });
  }
};
exports.getEmployee = async (req, res) => {
  const employeeId = req.params.id;
  console.log(employeeId, "deptId");
  if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json({
      message: "Invalid employeeId. Please provide a valid employeeId.",
    });
  }
  try {
    let employee = await User.findById(employeeId);
    res.status(201).send({ status: true, employee });
  } catch (error) {
    return res.status(400).send({ status: false, msg: "error" });
  }
};
exports.getEmployeeDptWise = async (req, res) => {
  const id = req.params.id;
  console.log(id, "deptId");
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid employeeId. Please provide a valid employeeId.",
    });
  }
  try {
    let employees = await User.find({
      "department.id": id,
    });
    res.status(201).send({ status: true, employees });
  } catch (error) {
    return res.status(400).send({ status: false, msg: "error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;
  console.log(employeeId, "deptId");
  if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json({
      message: "Invalid employeeId. Please provide a valid employeeId.",
    });
  }
  try {
    const result = await User.findByIdAndDelete(employeeId);
    res.status(201).send({ status: true, result });
  } catch (error) {
    return res.status(400).send({ status: false, msg: "error" });
  }
};

exports.updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  console.log(employeeId, "deptId");
  if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json({
      message: "Invalid deptId. Please provide a valid deptId.",
    });
  }
  try {
    // const update = await Company.findByIdAndUpdate({ _id: id }, req.body);
    const result = await User.updateOne(
      { _id: employeeId },
      { $set: req.body }
    );
    res.status(200).json({ status: true, result });
  } catch (error) {
    console.error("Failed to fetch company details:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

exports.assignDepartment = async (req, res) => {
  const employeeId = req.body.employeeId;
  const departmentId = req.body.departmentId;
  console.log(employeeId, "deptId");
  if (
    !employeeId ||
    !departmentId ||
    !mongoose.Types.ObjectId.isValid(employeeId) ||
    !mongoose.Types.ObjectId.isValid(departmentId)
  ) {
    return res.status(400).json({
      message: "Invalid id. Please provide a valid id.",
    });
  }
  try {
    // const update = await Company.findByIdAndUpdate({ _id: id }, req.body);
    let department = {
      id: departmentId,
      name: req.body.departmentName,
    };
    const result = await User.updateOne(
      { _id: employeeId },
      { $set: { department: department } }
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Failed to fetch company details:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
