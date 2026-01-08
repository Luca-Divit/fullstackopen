import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Person from "./components/Person";
import Notification from "./components/Notification";
import Error from "./components/Error";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // console.log('calling the server');
    personService.getAll().then((allPeople) => setPersons(allPeople));
  }, []);

  // console.log('We have this people', persons.length);

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearch(input);
    // console.log(input);
  };

  const newPersonsList = persons.filter((p) => {
    return (
      p.name.slice(0, search.length).toLowerCase() === search.toLowerCase()
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameAndNumber = { name: newName, number: newNumber };
    const existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson) {
      if (
        confirm(
          `Do you really want to update ${existingPerson.name} phone number?`
        )
      ) {
        const updatedPerson = { ...existingPerson, ...nameAndNumber };
        personService
          .update(updatedPerson)
          .then((personBack) => {
            setPersons(
              persons.map((p) => (p.id !== personBack.id ? p : personBack))
            );
            setNotificationMessage(`${personBack.name} has been updated`);
            setNewName("");
            setNewNumber("");
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch(() => {
            setPersons(persons.filter((p) => p.id !== updatedPerson.id));
            setErrorMessage(
              `Information: ${updatedPerson.name} has been removed from the server`
            );
            setNewName("");
            setNewNumber("");
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      personService.create(nameAndNumber).then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        setNotificationMessage(`${addedPerson.name} has been created`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDelete = (person) => {
    if (confirm(`Do you really want to remove ${person.name}?`)) {
      personService.destroy(person);
      setPersons(persons.filter((p) => p.id !== person.id));
    }
  };

  const personList = search
    ? newPersonsList.map((p) => (
        <Person key={p.id} p={p} handleDelete={() => handleDelete(p)} />
      ))
    : persons.map((p) => (
        <Person key={p.id} p={p} handleDelete={() => handleDelete(p)} />
      ));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
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
      {personList}
    </div>
  );
};

export default App;
