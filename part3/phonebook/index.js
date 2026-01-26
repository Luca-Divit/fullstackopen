require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const Person = require("./models/person");
app.use(express.static("dist"));

app.use(express.json());
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    tokens.body(req, res),
  ].join(" ");
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    numOfPersons = persons.length;
    const today = Date();
    const content = `<p>Phonebook has content for ${numOfPersons} people</p><p>${today}</p>`;
    res.send(content);
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.post("/api/persons", (req, res) => {
  person = req.body;

  if (!person.name || !person.number) {
    return res.status(400).json({
      error: "Content missing",
    });
  }

  Person.find({}).then((persons) => {
    nameExists = persons.find((p) => p.name === person.name);
    if (nameExists) {
      return res.status(400).json({
        error: "Name must be unique",
      });
    }

    newPerson = new Person({
      name: person.name,
      number: person.number,
    });
    newPerson.save().then(() => {
      res.json(person);
    });
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => res.json(person))
    .catch(() => res.status(404).end());
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  Person.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch(() => res.status(404).send("Person does not exists"));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
