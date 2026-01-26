const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, { family: 4 })
  .then((res) => {
    console.log("Succesfully connected to the DB");
  })
  .catch((err) => {
    console.log("Error connecting to the DB", err);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    ((returnedObject.id = returnedObject._id.toString()),
      delete returnedObject._id,
      delete returnedObject.__v);
  },
});

module.exports = mongoose.model("Person", personSchema);
