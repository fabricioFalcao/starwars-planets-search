import { createContext } from 'react';
import { PlanetType } from '../types';

type PlanetsContextType = {
  initialList: PlanetType[],
  filteredPlanets: PlanetType[],
  isLoading: boolean;
  error: string | null;
  applyFilter: (newList: PlanetType[]) => void,
  clearFilter: () => void
};

const PlanetsContext = createContext({} as PlanetsContextType);

export default PlanetsContext;
