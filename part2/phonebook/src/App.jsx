import { useState } from 'react';
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');


  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearch = (e) => {
    const input = e.target.value
    setSearch(input);
    // console.log(input);
  };

  const newPersonsList = persons.filter(p => {
    return p.name.slice(0,search.length).toLowerCase() === search
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameAndNumber = { name: newName, number: newNumber };
    if (persons.find(p => p.name === newName)) {
      return alert(`${newName} is already added to the phonebook`);
    }
    setPersons(persons.concat(nameAndNumber));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonsForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons
        search={search}
        persons={persons}
        newPersonsList={newPersonsList}
        />
    </div>
  );
};

export default App;
