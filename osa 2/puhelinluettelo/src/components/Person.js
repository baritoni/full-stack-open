const Person = ({ persons, handleClick }) => {
  return (
    <div>
      <p key="persons.name">
        {persons.name} {persons.number}{' '}
        <button onClick={() => handleClick(persons, persons.id)}>delete</button>
      </p>
    </div>
  );
};
export default Person;
