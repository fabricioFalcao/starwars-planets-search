import { createContext } from 'react';
import { PlanetType } from '../types';

type PlanetsContextType = {
  filteredPlanets: PlanetType[],
  isLoading: boolean;
  error: string | null;
};

const PlanetsContext = createContext({} as PlanetsContextType);

export default PlanetsContext;
