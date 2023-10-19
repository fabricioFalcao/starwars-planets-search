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

  const [filteredByName, setFilteredByName] = useState<PlanetType[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<PlanetType[]>([]);
  const [initialList, setInitialList] = useState<PlanetType[]>([]);

  useEffect(() => {
    const planetsList: PlanetType[] = data.map((planet) => {
      delete planet.residents;
      return planet;
    });
    setInitialList(planetsList);
    setFilteredPlanets(planetsList);
  }, [data]);

  const clearFilter = () => setFilteredPlanets(initialList);

  const applyNameFilter = (newList: PlanetType[]) => setFilteredByName(newList);

  const applyFilters = (newList: PlanetType[]) => setFilteredPlanets(newList);

  const values = {
    initialList,
    filteredByName,
    filteredPlanets,
    isLoading,
    error,
    applyFilters,
    applyNameFilter,
    clearFilter,
    setFilteredPlanets,
  };

  return (
    <PlanetsContext.Provider value={ values }>
      {children}
    </PlanetsContext.Provider>
  );
}
export default PlanetsProvider;
