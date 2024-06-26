import { useContext, useState } from 'react';
import { NumberFilterType } from '../types';
import PlanetsContext from '../context/PlanetsContext';
import useFilterAndSort from '../hooks/useFilterAndSort';

const initialColumnsOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const comparisonOptions = ['maior que', 'menor que', 'igual a'];

function NumberFilter() {
  const { clearFilter, isLoading } = useContext(PlanetsContext);
  const { numberFilters, setNumberFilters } = useFilterAndSort();

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

    if (!isLoading) {
      const newColumns = columnsOptions.filter((option) => option !== filterForm.column);
      setColumnsOptions(newColumns);

      setNumberFilters((previous) => [...previous, filterForm]);

      setFilterForm({
        column: newColumns[0],
        comparison: comparisonOptions[0],
        parameter: 0,
      });
    }
  };

  const handleDeleteFilter = (restoredColumn: string) => {
    setColumnsOptions((previous) => [...previous, restoredColumn]);

    const keptFilters = numberFilters
      .filter((filter) => filter.column !== restoredColumn);

    setNumberFilters(keptFilters);
  };

  const handleReset = () => {
    setColumnsOptions(initialColumnsOptions);

    setNumberFilters([]);

    clearFilter();
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
            <button
              onClick={ () => handleDeleteFilter(filter.column) }
            >
              Delete

            </button>
          </div>
        ))}
      </div>

      <button
        onClick={ handleReset }
        data-testid="button-remove-filters"
      >
        Remover todas filtragens

      </button>
    </section>
  );
}

export default NumberFilter;
