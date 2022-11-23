import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Header() {
  const { setFilter, inputs, setInputs, setSearch, search,
    columnFilter, setColumnFilter, saveFilter,
    setSaveFilter } = useContext(StarWarsContext);

  useEffect(() => {
    setColumnFilter([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  }, []);

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  const handleColumnRemove = () => {
    // const newFilters = [...saveFilter, inputs];
    setSaveFilter([...saveFilter, inputs]);
    const remove = columnFilter.filter((el) => el !== inputs.column);
    //! columnFilter.some((c) => c === el.column
    setColumnFilter(remove);
  };

  const handleButtonClick = () => {
    switch (inputs.operator) {
    case 'maior que':
      setSearch(search.filter((el) => Number(el[inputs
        .column]) > Number(inputs.number)));
      break;
    case 'menor que':
      setSearch(search.filter((el) => Number(el[inputs
        .column]) < Number(inputs.number)));
      break;
    default:
      setSearch(search.filter((el) => Number(el[inputs
        .column]) === Number(inputs.number)));
      break;
    }
    handleColumnRemove();
  };

  return (
    <div>
      <label htmlFor="search">
        Pesquisar planeta
        <input
          data-testid="name-filter"
          type="text"
          name="search"
          id="search"
          onChange={ (e) => setFilter(e.target.value) }
        />
      </label>
      <form>
        <label htmlFor="column">
          Coluna
          <select
            name="column"
            id="column"
            value={ inputs.column }
            data-testid="column-filter"
            onChange={ handleChange }
          >
            {
              columnFilter.map((el) => (
                <option key={ el } value={ el }>{ el }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="operator">
          Operador
          <select
            id="operator"
            name="operator"
            value={ inputs.operator }
            data-testid="comparison-filter"
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="number">
          <input
            type="number"
            name="number"
            id="number"
            value={ inputs.number }
            data-testid="value-filter"
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleButtonClick }
        >
          Filtrar
        </button>
        {/* <label htmlFor="order">
          Ordernar
          <select name="order" id="order" onChange={ handleChange }>
            <option value="population" name="order">population</option>
            <option value="orbital_period" name="order">orbital_period</option>
            <option value="diameter" name="order">diameter</option>
            <option value="rotation_period" name="order">rotation_period</option>
            <option value="surface_water" name="order">surface_water</option>
          </select>
        </label> */}
      </form>
    </div>
  );
}

export default Header;
