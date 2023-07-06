// Komponentti sisältää henkilön nimen ja puhelinnumeron lisäykseen tarvittavat inputit.
const Personadd = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          <b>name:</b>{' '}
          <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          <b>number:</b>{' '}
          <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Personadd;
