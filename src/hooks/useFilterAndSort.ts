import { useContext, useEffect, useState } from 'react';
import { NumberFilterType, PlanetType, SortType } from '../types';
import PlanetsContext from '../context/PlanetsContext';

type UseFilterAndSortType = {
  numberFilters: NumberFilterType[],
  setNumberFilters: React.Dispatch<React.SetStateAction<NumberFilterType[]>>,
  setSortColumns: React.Dispatch<React.SetStateAction<SortType>>
};

function useFilterAndSort(): UseFilterAndSortType {
  const { filteredByName, applyFilters } = useContext(PlanetsContext);

  const [numberFilters, setNumberFilters] = useState<NumberFilterType[]>([]);
  const [sortColumns, setSortColumns] = useState<SortType>({ column: '', sort: '' });
  const { column, sort } = sortColumns;

  const applyNumberFilters = (planet: PlanetType) => {
    const filtering: boolean[] = numberFilters.map((filter) => {
      const planetParameter = Number(planet[filter.column]);
      const filterParameter = Number(filter.parameter);
      switch (filter.comparison) {
        case 'maior que':
          return planetParameter > filterParameter;

        case 'menor que':
          return planetParameter < filterParameter;

        default:
          return planetParameter === filterParameter;
      }
    });

    return filtering.every((result) => result);
  };

  useEffect(() => {
    if (filteredByName?.length > 0) {
      const newList = filteredByName.filter(applyNumberFilters).sort((a, b) => {
        if (a[column] === 'unknown') return 1;
        if (b[column] === 'unknown') return -1;
        if (sort === 'ASC') return Number(a[column]) - Number(b[column]);
        if (sort === 'DESC') return Number(b[column]) - Number(a[column]);
        return 1;
      });

      applyFilters(newList);
      console.log(newList);
    }
  }, [numberFilters, filteredByName, sortColumns]);

  return { numberFilters, setNumberFilters, setSortColumns };
}

export default useFilterAndSort;
