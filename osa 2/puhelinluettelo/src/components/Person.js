const Person = ({ persons, handleClick }) => {
  const personName = persons.name;

  return (
    <div>
      <p>
        {persons.name} {persons.number}{' '}
        <button onClick={() => handleClick(persons.id, personName)}>
          delete
        </button>
      </p>
    </div>
  );
};
export default Person;
