import { createContext } from 'react';
import { PlanetType } from '../types';

type PlanetsContextType = {
  initialList: PlanetType[],
  filteredByName: PlanetType[],
  filteredPlanets: PlanetType[],
  isLoading: boolean;
  error: string | null;
  applyFilters: (newList: PlanetType[]) => void,
  applyNameFilter:(newList: PlanetType[]) => void,
  clearFilter: () => void,
  setFilteredPlanets: React.Dispatch<React.SetStateAction<PlanetType[]>>,
};

const PlanetsContext = createContext({} as PlanetsContextType);

export default PlanetsContext;
