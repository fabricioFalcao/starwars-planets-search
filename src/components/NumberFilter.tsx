import { useState } from 'react';
import { NumberFilterType } from '../types';
import useNumberFilters from '../hooks/useNumberFilters';

const columnOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const comparisonOptions = ['maior que', 'menor que', 'igual a'];

const INITIAL_STATE = {
  column: columnOptions[0],
  comparison: comparisonOptions[0],
  parameter: 0,

};

function NumberFilter() {
  const [numberFilters, setNumberFilters] = useNumberFilters();

  const [filterForm, setFilterForm] = useState<NumberFilterType>(INITIAL_STATE);
  const { column, comparison, parameter } = filterForm;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = event.target;
    setFilterForm({
      ...filterForm,
      [id]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNumberFilters((previous) => [...previous, filterForm]);

    setFilterForm(INITIAL_STATE);
  };

  return (
    <section>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="column">Column</label>
        <select
          name=""
          id="column"
          data-testid="column-filter"
          value={ column }
          onChange={ handleChange }
        >
          {columnOptions.map((option) => <option key={ option }>{option}</option>)}
        </select>

        <label htmlFor="comparison">Comparison</label>
        <select
          name=""
          id="comparison"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ handleChange }
        >
          {comparisonOptions.map((option) => <option key={ option }>{option}</option>)}
        </select>

        <input
          id="parameter"
          type="number"
          data-testid="value-filter"
          value={ parameter }
          onChange={ handleChange }
        />

        <button
          type="submit"
          data-testid="button-filter"
        >
          Filter
        </button>
      </form>

      <div>
        {numberFilters.map((filter) => (
          <div key={ filter.column }>
            <span>
              {
              `You filtered for ${filter.column} ${filter.comparison} ${filter.parameter}`
              }
            </span>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NumberFilter;
