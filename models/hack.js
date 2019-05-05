const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hackSchema = new Schema({
  name: { type: String, required: true },
  summary: { type: String, required: true },
  tag: { type: String, required: true },
  meta: Number,
  email: String,
  image: String,
  link: String,
  flagged: Boolean,
  date: { type: Date, default: Date.now }
});

const Hack = mongoose.model("Hack", hackSchema);

module.exports = Hack;
