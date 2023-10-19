import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { PlanetType } from '../types';

const tableHeader = [
  'Name',
  'Rotation Period',
  'Orbital Period',
  'Diameter',
  'Climate',
  'Gravity',
  'Terrain',
  'Surface Water',
  'Population',
  'Films',
  'Created',
  'Edited',
  'URL',
];

function Table() {
  const { filteredPlanets, isLoading, error } = useContext(PlanetsContext);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <table>
      <thead>
        <tr>
          {tableHeader.map((title) => <th key={ title }>{title}</th>)}
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.map((planet: PlanetType) => (
          <tr key={ planet.name }>
            {Object.values(planet).map((attribute: string | any) => (
              <td
                key={ attribute }
                data-testid={ attribute === 'name' ? 'planet-name' : '' }
              >
                {attribute}

              </td>))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
