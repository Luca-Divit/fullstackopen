const express = require("express");
const app = express();

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

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const person = persons.find((p) => p.id === id);
  person ? res.json(person) : res.status(404).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
