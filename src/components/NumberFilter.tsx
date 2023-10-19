import { useState } from 'react';
import { NumberFilterType } from '../types';
import useNumberFilters from '../hooks/useNumberFilters';

const initialColumnsOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const comparisonOptions = ['maior que', 'menor que', 'igual a'];

function NumberFilter() {
  const [numberFilters, setNumberFilters] = useNumberFilters();

  const [columnsOptions, setColumnsOptions] = useState<string[]>(initialColumnsOptions);

  const [filterForm, setFilterForm] = useState<NumberFilterType>({
    column: columnsOptions[0],
    comparison: comparisonOptions[0],
    parameter: 0,
  });

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

    const newColumns = columnsOptions.filter((option) => option !== filterForm.column);
    setColumnsOptions(newColumns);

    setNumberFilters((previous) => [...previous, filterForm]);

    setFilterForm({
      column: newColumns[0],
      comparison: comparisonOptions[0],
      parameter: 0,
    });
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
          {columnsOptions.map((option) => <option key={ option }>{option}</option>)}
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
          <div
            key={ filter.column }
            data-testid="filter"
          >
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
