import { useState, useEffect } from 'react';
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // console.log('calling the server');
    personService
      .getAll()
      .then(allPeople => setPersons(allPeople))
  }, []);

  // console.log('We have this people', persons.length);

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
    personService.create(nameAndNumber)
      .then(addedPerson => setPersons(persons.concat(addedPerson)));
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
