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
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g.test(
          v,
        );
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    ((returnedObject.id = returnedObject._id.toString()),
      delete returnedObject._id,
      delete returnedObject.__v);
  },
});

module.exports = mongoose.model("Person", personSchema);
