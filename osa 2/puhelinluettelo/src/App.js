import { useState, useEffect } from 'react';
import './styles/App.css';
import Filter from './components/Filter';
import Persons from './components/Persons';
import Personadd from './components/Personadd';
import personsService from './services/persons';
import Notification from './components/Notification';
import Error from './components/Error';

const App = () => {
  const [filter, setFilter] = useState({
    query: '',
    list: []
  });
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  // console.log('render', persons.length, 'persons');

  const addPerson = (event, id) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };

    const personExisted = persons.find((person) => person.name === newName);

    const personUpdate = {
      ...personExisted,
      number: newNumber
    };

    if (personExisted) {
      window.confirm(`Do you want to change number of ${personUpdate.name}?`);
      personsService
        .update(personUpdate.id, personUpdate)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== personUpdate.id ? person : returnedPerson
            )
          );
          setSuccessMessage(`Phonenumber of ${personUpdate.name} updated`);
          /* Laskuri pitää onnistuneen henkilön poiston jälkeen viestin näkyvissä 5 sekuntia, jonka jälkeen viesti saa
      arvokseen nullin */
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `${personUpdate.name} has been already deleted from phonebook`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          // Filtteröidään poistettu henkilö pois persons-taulukosta asettamalla sovellukselle uusi tila
          setPersons(persons.filter((p) => p.id != personUpdate.id));
        });
    }
    // Uusi nimi luodaan puhelinluetteloon vain siinä tapauksessa, että lisättävä nimi ei ole jo puhelinluettelossa.
    else {
      personsService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
      });
      setSuccessMessage(`Added ${newName}`);
      /* Laskuri pitää onnistuneen henkilön lisäyksen jälkeen viestin näkyvissä 5 sekuntia, jonka jälkeen viesti saa
      arvokseen nullin */
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  };

  const deleteById = (id, personName) => {
    if (
      window.confirm(
        `Do you really want to delete ${personName} from phonebook?`
      )
    ) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setSuccessMessage(`Deleted ${personName}`);
          /* Laskuri pitää onnistuneen henkilön poiston jälkeen viestin näkyvissä 5 sekuntia, jonka jälkeen viesti saa
      arvokseen nullin */
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(`Error deleting person by Id ${id}`);
          console.log('error :', error);
        });
    } else {
      console.log('Delete canceled');
      setPersons(persons);
    }
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
      <Notification message={successMessage} />
      <Error message={errorMessage} />
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
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        deleteById={deleteById}
      />
    </div>
  );
};
export default App;
