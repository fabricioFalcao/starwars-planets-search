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

  const [initialList, setInitialList] = useState<PlanetType[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<PlanetType[]>([]);
  const [sortedPlanets, setSortedPlanets] = useState<PlanetType[]>([]);
  const [filteredByName, setFilteredByName] = useState<PlanetType[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      const planetsList: PlanetType[] = data.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setInitialList(planetsList);
      setFilteredPlanets(planetsList);
      setSortedPlanets(planetsList);
      setFilteredByName(planetsList);
    }
  }, [data]);

  const clearFilter = () => setFilteredPlanets(initialList);

  const applyFilters = (newList: PlanetType[]) => setFilteredPlanets(newList);

  const sortList = (newList: PlanetType[]) => setSortedPlanets(newList);

  const applyNameFilter = (newList: PlanetType[]) => setFilteredByName(newList);

  const values = {
    initialList,
    filteredPlanets,
    sortedPlanets,
    filteredByName,
    isLoading,
    error,
    applyFilters,
    sortList,
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
