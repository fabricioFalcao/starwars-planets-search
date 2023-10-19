import useNameFilter from '../hooks/useNameFilter';

function NameFilter() {
  const [nameFilter, setNameFilter] = useNameFilter();

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        value={ nameFilter }
        onChange={ ({ target }) => setNameFilter(target.value) }
        placeholder="Enter planet name"
      />
    </div>
  );
}

export default NameFilter;
