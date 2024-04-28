const express = require("express");
const adminRouter = express.Router();
const admin = require("../controllers/admin.controllers");
let auth = require("../controllers/auth.controllers");

// Admin Auth controllers
adminRouter.post("/register", auth.adminRegister);
adminRouter.post("/login", auth.adminLogin);
adminRouter.post("/tokenIsValid", auth.adminValidateToken);

// Admin controllers
adminRouter.get("/", admin.getAdmin);
adminRouter.post("/addEmployee", admin.addEmployee);
adminRouter.put("/takeAction", admin.takeAction);
adminRouter.get("/getEmpList", admin.getEmpList);
adminRouter.delete("/delete/:id", admin.deleteEmp);
adminRouter.get("/getUserData/:id", admin.getEmpData);
adminRouter.post("/search", admin.searchEmp);
adminRouter.get("/getAllEmpsSalReceipt", admin.getAllEmpsSalReceipt);
adminRouter.get("/getSingleEmpSalReceipts/:id", admin.getEmpSalReceipts);
adminRouter.put("/generateSalReceipt", admin.generateSalReceipt);
adminRouter.get("/getEmpSalList", admin.getEmpSalList);
adminRouter.get("/getUserSalDetails/:id", admin.getUserSalDetails);
adminRouter.put("/updateSalaryDetails/:id", admin.updateSalaryDetails);
adminRouter.get("/getTeamsAndRoles", admin.getTeamsAndRoles);
adminRouter.post("/addNewTeam", admin.addNewTeam);
adminRouter.post("/addNewRole", admin.addNewRole);
adminRouter.delete("/deleteAdminAcc/:id", admin.deleteAdminAcc);
adminRouter.get("/getLoanList", admin.getLoanList);
adminRouter.get("/getEmpLoanHistory/:id", admin.getEmpLoanHistory);
adminRouter.put("/loanPaid", admin.loanPaid);

module.exports = adminRouter;
