import Person from './Person';

/*Komponentti näyttää kaikki puhelinluettelon henkilöt jos filter kenttä on tyhjä, jos filter
kenttään kirjoitetaan tekstiä näytetään filterin mukaiset henkilöt. */
const Persons = ({ persons, filter, setPersons, deleteById }) => {
  return (
    <div key="persons.id">
      {filter.query === ''
        ? persons.map((person) => (
            <Person
              key={person.id}
              persons={person}
              setPersons={setPersons}
              handleClick={deleteById}
            />
          ))
        : filter.list.map((person) => (
            <Person
              key={person.id}
              persons={person}
              setPersons={setPersons}
              handleClick={deleteById}
            />
          ))}
    </div>
  );
};

export default Persons;
