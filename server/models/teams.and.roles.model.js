const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Team_Role_Schema = new Schema({
  teamNames: [{ type: String}],
  roleNames: [{ type: String }],
});

const TeamAndRole = mongoose.model("TeamAndRole", Team_Role_Schema);

module.exports = TeamAndRole;
