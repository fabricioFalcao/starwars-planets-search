import { useState } from 'react';
import { SortType } from '../types';
import useFilterAndSort from '../hooks/useFilterAndSort';

const initialColumnsOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const initialSortForm = { column: initialColumnsOptions[0], sort: '' };

function SortColumns() {
  const { setSortColumns } = useFilterAndSort();

  const [sortForm, setSortForm] = useState<SortType>(initialSortForm);
  const { column } = sortForm;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setSortForm({
      ...sortForm,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSortColumns(sortForm);
  };

  return (
    <form
      action=""
      onSubmit={ handleSubmit }
    >
      <label htmlFor="column-sort">Column</label>
      <select
        name="column"
        id="column-sort"
        data-testid="column-sort"
        value={ column }
        onChange={ handleChange }
      >
        {initialColumnsOptions.map((option) => <option key={ option }>{option}</option>)}
      </select>
      <div>
        <input
          type="radio"
          name="sort"
          data-testid="column-sort-input-asc"
          value="ASC"
          id="ASC"
          onChange={ handleChange }
        />
        <label htmlFor="ASC">Ascending</label>

        <input
          type="radio"
          name="sort"
          data-testid="column-sort-input-desc"
          value="DESC"
          id="DESC"
          onChange={ handleChange }
        />
        <label htmlFor="DESC">Descending</label>

      </div>

      <button
        type="submit"
        data-testid="column-sort-button"
      >
        Ordenar

      </button>
    </form>
  );
}

export default SortColumns;
