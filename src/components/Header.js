import React from 'react';

function Header() {
  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  return (
    <div>
      <form>
        <label htmlFor="search">
          <input
            type="text"
            name="search"
            id="search"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="column">
          Coluna
          <select name="column" id="column" onChange={ handleChange }>
            <option value="population" name="column">population</option>
            <option value="orbital_period" name="column">orbital_period</option>
            <option value="diameter" name="column">diameter</option>
            <option value="rotation_period" name="column">rotation_period</option>
            <option value="surface_water" name="column">surface_water</option>
          </select>
        </label>
        <label htmlFor="operator">
          Episódios:
          <select id="operator" name="operator" onChange={ handleChange }>
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
            onChange={ handleChange }
          />
        </label>
        <button type="button" onClick={ () => {} }>Filtrar</button>
        <label htmlFor="order">
          Ordernar
          <select name="order" id="order" onChange={ handleChange }>
            <option value="population" name="order">population</option>
            <option value="orbital_period" name="order">orbital_period</option>
            <option value="diameter" name="order">diameter</option>
            <option value="rotation_period" name="order">rotation_period</option>
            <option value="surface_water" name="order">surface_water</option>
          </select>
        </label>
      </form>
    </div>
  );
}

export default Header;
