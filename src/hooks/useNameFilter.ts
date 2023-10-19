import { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

type UseNameFilterType = [string, React.Dispatch<React.SetStateAction<string>>];

function useNameFilter(): UseNameFilterType {
  const {
    initialList,
    applyNameFilter,
  } = useContext(PlanetsContext);

  const [nameFilter, setNameFilter] = useState<string>('');

  useEffect(() => {
    const newList = initialList
      .filter(({ name }) => name.toLowerCase().includes(nameFilter.toLowerCase()));

    applyNameFilter(newList);
  }, [applyNameFilter, initialList, nameFilter]);

  return [nameFilter, setNameFilter];
}

export default useNameFilter;
