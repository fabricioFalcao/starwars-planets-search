import { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

type UseNameFilterType = [string, React.Dispatch<React.SetStateAction<string>>];

function useNameFilter(): UseNameFilterType {
  const {
    initialList,
    applyNameFilter,
    isLoading,
  } = useContext(PlanetsContext);

  console.log(initialList);
  console.log(applyNameFilter);

  const [nameFilter, setNameFilter] = useState<string>('');

  useEffect(() => {
    if (!isLoading && initialList?.length > 0) {
      const newList = initialList
        ?.filter(({ name }) => name.toLowerCase().includes(nameFilter.toLowerCase()));

      applyNameFilter(newList);
    }
  }, [nameFilter]);

  return [nameFilter, setNameFilter];
}

export default useNameFilter;
