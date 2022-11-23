import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Header() {
  const { setFilter, inputs, setInputs, setSearch, search } = useContext(StarWarsContext);

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
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
            <option value="population" name="column">population</option>
            <option value="orbital_period" name="column">orbital_period</option>
            <option value="diameter" name="column">diameter</option>
            <option value="rotation_period" name="column">rotation_period</option>
            <option value="surface_water" name="column">surface_water</option>
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
