import { useContext, useEffect, useState } from 'react';
import { NumberFilterType, PlanetType } from '../types';
import PlanetsContext from '../context/PlanetsContext';

type UseNumberFiltersType = [
  NumberFilterType[],
  React.Dispatch<React.SetStateAction<NumberFilterType[]>>,
];

function useNumberFilters(): UseNumberFiltersType {
  const { filteredByName, applyFilters, isLoading } = useContext(PlanetsContext);

  const [numberFilters, setNumberFilters] = useState<NumberFilterType[]>([]);

  useEffect(() => {
    if (!isLoading && filteredByName?.length > 0) {
      const applyNumberFilters = (planet: PlanetType) => {
        const filtering: boolean[] = numberFilters.map((filter) => {
          const { column } = filter as { column: keyof PlanetType };
          const planetParameter = Number(planet[column]);
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

      const newList = filteredByName.filter(applyNumberFilters);

      applyFilters(newList);
    }
  }, [numberFilters, filteredByName, applyFilters]);

  return [numberFilters, setNumberFilters];
}

export default useNumberFilters;
