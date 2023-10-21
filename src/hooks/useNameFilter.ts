import { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

type UseNameFilterType = [string, React.Dispatch<React.SetStateAction<string>>];

function useNameFilter(): UseNameFilterType {
  const {
    sortedPlanets,
    applyNameFilter,
    isLoading,
  } = useContext(PlanetsContext);

  const [nameFilter, setNameFilter] = useState<string>('');

  useEffect(() => {
    if (!isLoading && sortedPlanets?.length > 0) {
      const copy = [...sortedPlanets];
      const newList = copy
        ?.filter(({ name }) => name.toLowerCase().includes(nameFilter.toLowerCase()));

      applyNameFilter(newList);
    }
  }, [nameFilter, sortedPlanets]);

  return [nameFilter, setNameFilter];
}

export default useNameFilter;
