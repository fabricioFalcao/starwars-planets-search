import { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function NameFilter() {
  const {
    initialList,
    applyFilter,
  } = useContext(PlanetsContext);

  const [nameFilter, setNameFilter] = useState<string>('');

  useEffect(() => {
    const newList = initialList
      .filter(({ name }) => name.toLowerCase().includes(nameFilter.toLowerCase()));

    applyFilter(newList);
  }, [nameFilter]);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        value={ nameFilter }
        onChange={ ({ target }) => setNameFilter(target.value) }
      />
    </div>
  );
}

export default NameFilter;
