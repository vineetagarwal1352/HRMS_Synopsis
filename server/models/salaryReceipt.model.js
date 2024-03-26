const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SalaryReceiptSchema = new Schema({
  empId: { type: String },
  empName: { type: String },
  currentSalary: { type: String },
  monthlyReceipts: [{ type: String }],
});

const SalaryReceipt = mongoose.model("SalaryReceipt", SalaryReceiptSchema);

module.exports = SalaryReceipt;
