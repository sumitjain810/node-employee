import { url } from "../config/db.config.js";
import Employee from "./employee.module.js";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = url;
db.employee = Employee(mongoose);

export default db;
