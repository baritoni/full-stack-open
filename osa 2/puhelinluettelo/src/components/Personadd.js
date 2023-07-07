// Komponentti sisältää henkilön nimen ja puhelinnumeron lisäykseen tarvittavat inputit.
const Personadd = ({
  addPerson,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          <b>name:</b> <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <b>number:</b>{' '}
          <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button className="addButton" type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Personadd;
