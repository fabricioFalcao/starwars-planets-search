const initialColumnsOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function SortColumns() {
  return (
    <form action="">
      <label htmlFor="column-sort">Column</label>
      <select
        name=""
        id="column-sort"
        data-testid="column-sort"
        // value={ column }
        // onChange={ handleChange }
      >
        {initialColumnsOptions.map((option) => <option key={ option }>{option}</option>)}
      </select>
      <div>
        <input
          type="radio"
          name="order-radio"
          data-testid="column-sort-input-asc"
          // value={ ASC }
          id="ASC"
        />
        <label htmlFor="ASC">Ascending</label>

        <input
          type="radio"
          name="order-radio"
          data-testid="column-sort-input-desc"
          // value={ DESC }
          id="DESC"
        />
        <label htmlFor="DESC">Descending</label>

      </div>
    </form>
  );
}

export default SortColumns;
