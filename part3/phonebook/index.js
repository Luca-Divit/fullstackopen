const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(cors());

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

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/info", (req, res) => {
  const numOfPersons = persons.length;
  // console.log(numOfPersons);
  const today = Date();
  // console.log(today);s
  const content = `<p>Phonebook has content for ${numOfPersons} people</p><p>${today}</p>`;
  res.send(content);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  person = req.body;

  if (!person.name || !person.number) {
    return res.status(400).json({
      error: "Content missing",
    });
  }

  nameExists = persons.find((p) => p.name === person.name);
  if (nameExists) {
    return res.status(400).json({
      error: "Name must be unique",
    });
  }

  person.id = Math.random() * 100000000000;
  persons.push(person);
  res.json(person);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const person = persons.find((p) => p.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  // console.log(typeof id);

  const personToDelete = persons.find((p) => p.id === id);
  // console.log(personToDelete);

  if (!personToDelete) {
    return res.status(404).send("Person does not exists");
  }

  persons = persons.filter((p) => p !== personToDelete);
  res.status(206).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
