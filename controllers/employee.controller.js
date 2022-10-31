import express from "express";
const router = express.Router();
import db from "../models/index.js";
import constants from "../constants/constants.js";

router.get("/search", async (req, res) => {
  console.log("GET Request: ", req.query);

  const employees = await db.employee.find({
    empName: { $regex: req.query.text, $options: "$i" },
  });
  console.log("GET Employees: ", employees);
  res.status(200).send(employees);
});

router.get("/getAll", async (req, res) => {
  console.log("GET Request: ", req.body);

  const employees = await db.employee.find();
  console.log("GET Employees: ", employees);
  res.status(200).send(employees);
});

router.post("/save", async (req, res) => {
  console.log("POST Request: ", req.body);

  const data = {
    empId: req.body.empId,
    empName: req.body.empName,
    status: req.body.status,
    designation: req.body.designation,
    address: req.body.address,
  };
  console.log("POST Request: ", data);

  const employee = new db.employee(data);
  const savedEmployee = await employee.save();
  console.log("POST savedEmployee: ", savedEmployee);
  res.status(200).send(savedEmployee);
});

router.post("/delete", async (req, res) => {
  console.log("Delete Request: ", req.body);

  const deletedEmployee = await db.employee.deleteOne({
    _id: ObjectId(req.body.id),
  });
  res.status(200).send(deletedEmployee);
});

export default router;

// async function notifyUser(userId, existingRequest) {
//   let foundEmployee = await db.employee.findOne({ userId: userId });
//   console.log("foundEmployee: ", foundEmployee);
//   if (
//     foundEmployee &&
//     !existingRequest &&
//     foundEmployee.status === constants.abandonedStatus &&
//     foundEmployee.notificationCount < constants.attempts
//   ) {
//     setTimeout(async function () {
//       let recheckEmployee = await db.employee.findOne({ userId: userId });

//       if (recheckEmployee.status === constants.abandonedStatus) {
//         console.log("Time to notify...");
//         recheckEmployee.notificationCount++;
//         await recheckEmployee.save();
//         if (recheckEmployee.notificationCount < constants.attempts) {
//           notifyUser(userId);
//         }
//       }
//     }, constants.intervals[foundEmployee.notificationCount]); // send notification after specific time
//   } else if (
//     foundEmployee &&
//     existingRequest &&
//     foundEmployee.status === constants.abandonedStatus &&
//     foundEmployee.notificationCount == constants.attempts
//   ) {
//     foundEmployee.notificationCount = constants.startCount;
//     await foundEmployee.save();
//     notifyUser(userId);
//   }
// }

// router.post("/abandoned", async (req, res) => {
//   try {
// let foundEmployee = await db.employee.findOne({ userId: req.body.userId });
//     notifyUser(req.body.userId, true);
//     res.status(200).send(foundEmployee);
//     const data = {
//       userId: req.body.userId,
//       status: constants.abandonedStatus,
//       notificationCount: constants.startCount,
//     };
//     const employee = new db.employee(data);
//     const savedEmployee = await employee.save();
//     res.status(200).send(savedEmployee);
//     notifyUser(data.userId);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });
