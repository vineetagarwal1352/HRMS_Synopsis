let Admin = require("./admin.model");
let Loan = require("./loan.model");
let Salary = require("./salary.model");
let SalaryReceipt = require("./salaryReceipt.model");
let TeamAndRole = require("./teams.and.roles.model");
let User = require("./user.model");
require("dotenv").config();

async function IntialiseDb() {
  try {
    if (process.env.DB_SETUP == 1) {
      var newLoan = new Loan({
        reqId: "001",
        empId: "001",
        date: "001",
        empName: "001",
        gender: "001",
        empRole: "001",
        empTeam: "001",
        empEmail: "001",
        loanNote: "001",
        loanReason: "001",
        modeOfRepayment: "001",
        timePeriod: "001",
        amount: "001",
        loanRepaid: true,
      });
      var newSalary = new Salary({
        empId: "001",
        empName: "001",
        basicPay: "001",
        totalLeaves: "001",
        travelAllowance: "001",
        medicalAllowance: "001",
        bonus: "001",
        salary: "001",
      });
      var newSalaryRecipt = new SalaryReceipt({
        empId: "001",
        empName: "001",
        currentSalary: "001",
        monthlyReceipts: ["001"],
      });
      var newTeamAndRole = new TeamAndRole({
        teamNames: ["001"],
        roleNames: ["001"],
      });

      newLoan = await newLoan.save();
      newSalary = await newSalary.save();
      newSalaryRecipt = await newSalaryRecipt.save();
      newTeamAndRole = await newTeamAndRole.save();
      console.log("DB Intialised !!");
    }
  } catch (error) {
    console.log(`IntialiseDb => ${error}`);
  }
}
IntialiseDb();

module.exports = {
  Admin,
  User,
  Salary,
  SalaryReceipt,
  TeamAndRole,
  Loan,
};
