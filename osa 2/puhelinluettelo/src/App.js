import { useState, useEffect } from 'react';
import './styles/App.css';
import Filter from './components/Filter';
import Persons from './components/Persons';
import Personadd from './components/Personadd';
import personsService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [filter, setFilter] = useState({
    query: '',
    list: []
  });
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  console.log('Persons: ', persons);
  console.log('render', persons.length, 'persons');

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };

    personsService.create(personObject).then((returnedPerson) => {
      console.log('create method: ', persons);
      setPersons(persons.concat(returnedPerson));
      setNewName('');
    });

    const personExisted = persons.find((person) => person.name === newName);

    if (personExisted) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  };

  const deleteById = (persons, id) => {
    /*
    if (
      window.confirm(
        `Do you really want to delete ${persons.name} from phonebook?`
      )
    )
    */
    personsService
      .deletePerson(id)
      .then(() => {
        console.log('response: ', persons);
        setPersons(persons.filter((p) => p.id !== id));
      })
      .catch((error) => {
        console.log(`Error deleting person by Id ${id}`);
        console.log('error :', error);
      });

    /*
    else {
      console.log('Delete canceled');
      setPersons(persons.filter((p) => p.id !== id));
    }
    */
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    const results = persons.filter((person) => {
      if (event.target.value === '') return persons;
      return person.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setFilter({
      query: event.target.value,
      list: results
    });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <Personadd
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        key={persons.id}
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        deleteById={deleteById}
      />
    </div>
  );
};
export default App;
