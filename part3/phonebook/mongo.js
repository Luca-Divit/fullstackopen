const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please input the password");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://dbuser:${password}@cluster0.lru0dfz.mongodb.net/?appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  person = new Person({
    name,
    number,
  });

  person.save().then((res) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((res) => {
    console.log("phonebook:");
    res.forEach((p) => console.log(`${p.name} ${p.number}`));
    mongoose.connection.close();
  });
}
