import { createContext } from 'react';
import { PlanetType } from '../types';

type PlanetsContextType = {
  initialList: PlanetType[],
  filteredByName: PlanetType[],
  filteredPlanets: PlanetType[],
  isLoading: boolean;
  error: string | null;
  applyNameFilter:(newList: PlanetType[]) => void,
  applyFilters: (newList: PlanetType[]) => void,
  clearFilter: () => void,
  setFilteredPlanets: React.Dispatch<React.SetStateAction<PlanetType[]>>,
};

const PlanetsContext = createContext({} as PlanetsContextType);

export default PlanetsContext;
