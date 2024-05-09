const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
mongoose.Promise = global.Promise;
const quasarConnectSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    projectBudget: { type: String, require: true },
    projectDetail: { type: String, require: true },
    dateTime: { type: String, require: true },
  },
  { versionKey: false }
);
autoIncrement.initialize(mongoose.connection);
quasarConnectSchema.plugin(autoIncrement.plugin, "QuasarConnect");

module.exports = mongoose.model("QuasarConnect", quasarConnectSchema);
