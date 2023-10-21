import { createContext } from 'react';
import { PlanetType } from '../types';

type PlanetsContextType = {
  initialList: PlanetType[],
  filteredPlanets: PlanetType[],
  sortedPlanets: PlanetType[],
  filteredByName: PlanetType[],
  isLoading: boolean;
  error: string | null;
  applyFilters: (newList: PlanetType[]) => void,
  sortList: (newList: PlanetType[]) => void,
  applyNameFilter:(newList: PlanetType[]) => void,
  clearFilter: () => void,
  setFilteredPlanets: React.Dispatch<React.SetStateAction<PlanetType[]>>,
};

const PlanetsContext = createContext({} as PlanetsContextType);

export default PlanetsContext;
