// Filter kentän sisältävä komponentti
const Filter = (props) => {
  return (
    <div>
      <b>filter shown with </b>
      <input
        value={props.filter.query}
        onChange={props.handleFilterChange}
        type="search"
      />
    </div>
  );
};

export default Filter;
