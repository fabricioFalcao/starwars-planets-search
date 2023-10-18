import { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import { PlanetType } from '../types';
import useFetch from '../hooks/useFetch';
import fetchPlanets from '../service/fetchPlanets';

type PlanetsProviderProps = {
  children: React.ReactNode
};

function PlanetsProvider({ children }: PlanetsProviderProps) {
  const { data, error, isLoading } = useFetch(fetchPlanets);

  const [filteredPlanets, setFilteredPlanets] = useState<PlanetType[]>([]);

  console.log(filteredPlanets);

  useEffect(() => {
    const planetsList: PlanetType[] = data.map((planet) => {
      delete planet.residents;
      return planet;
    });
    setFilteredPlanets(planetsList);
  }, [data]);

  const values = {
    filteredPlanets,
    isLoading,
    error,

  };

  return (
    <PlanetsContext.Provider value={ values }>
      {children}
    </PlanetsContext.Provider>
  );
}
export default PlanetsProvider;
