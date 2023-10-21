import { useContext, useEffect, useState } from 'react';
import { NumberFilterType, PlanetType, SortType } from '../types';
import PlanetsContext from '../context/PlanetsContext';

type UseFilterAndSortType = {
  numberFilters: NumberFilterType[],
  setNumberFilters: React.Dispatch<React.SetStateAction<NumberFilterType[]>>,
  sortColumns: SortType,
  setSortColumns: React.Dispatch<React.SetStateAction<SortType>>
};

function useFilterAndSort(): UseFilterAndSortType {
  const {
    applyFilters,
    initialList,
    filteredPlanets,
    sortList,
  } = useContext(PlanetsContext);

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
    if (initialList?.length > 0) {
      const newList = initialList.filter(applyNumberFilters);

      applyFilters(newList);
    }
  }, [numberFilters]);

  useEffect(() => {
    if (filteredPlanets?.length > 0) {
      const newArr = [...filteredPlanets];
      const sortedList = newArr.sort((a, b) => {
        if (a[column] === 'unknown') return 1;
        if (b[column] === 'unknown') return -1;
        if (sort === 'ASC') return Number(a[column]) - Number(b[column]);
        if (sort === 'DESC') return Number(b[column]) - Number(a[column]);
        return 1;
      });

      sortList(sortedList);
    }
  }, [sortColumns, filteredPlanets]);

  return { numberFilters, setNumberFilters, sortColumns, setSortColumns };
}

export default useFilterAndSort;
