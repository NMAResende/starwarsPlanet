import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Header() {
  const { data, setFilter, inputs, setInputs, setSearch, search,
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
  }, [setColumnFilter]);

  const handleSelect = () => {
    let filterByArray = data;
    switch (inputs.operator) {
    case 'maior que':
      filterByArray = search.filter((el) => Number(el[inputs
        .column]) > Number(inputs.number));
      break;
    case 'menor que':
      filterByArray = search.filter((el) => Number(el[inputs
        .column]) < Number(inputs.number));
      break;
    default:
      filterByArray = search.filter((el) => Number(el[inputs
        .column]) === Number(inputs.number));
      break;
    }
    setSearch(filterByArray);
  };

  // const handleSelectRemove = () => {
  //   let filterByArray = data;
  //   saveFilter.map(() => {
  //     filterByArray = [];
  //     switch (inputs.operator) {
  //     case 'maior que':
  //       filterByArray = data.filter((el) => Number(el[inputs
  //         .column]) > Number(inputs.number));
  //       break;
  //     case 'menor que':
  //       filterByArray = data.filter((el) => Number(el[inputs
  //         .column]) < Number(inputs.number));
  //       break;
  //     case 'igual a':
  //       filterByArray = data.filter((el) => Number(el[inputs
  //         .column]) === Number(inputs.number));
  //       break;
  //     default:
  //       break;
  //     }
  //     return filterByArray;
  //   });
  //   if (filterByArray.length > 0) {
  //     return setSaveFilter(filterByArray);
  //   }
  //   return data;
  // };

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

  const handleRemoveFilter = (event) => {
    setSaveFilter(saveFilter.filter((e) => e.column !== event.target.value));
    // const removeFilter = saveFilter.filter((_e, index) => index !== i);
    // setSaveFilter(removeFilter);
    // handleSelectRemove();
  };

  const handleRemoveAllFilters = () => {
    setSaveFilter([]);
    setColumnFilter([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setSearch(data);
  };

  const handleButtonClick = () => {
    handleSelect();
    setSaveFilter([...saveFilter, inputs]);
    setInputs({ ...inputs, column: columnFilter[0] });
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
      <ul>
        {
          saveFilter.map((el, i) => (
            <li key={ i } data-testid="filter">
              <p>{`${el.column} ${el.operator} ${el.number}`}</p>
              <button
                type="button"
                value={ el.column }
                onClick={ handleRemoveFilter }
              >
                Delete
              </button>
            </li>
          ))
        }
      </ul>
      <button
        type="button"
        onClick={ handleRemoveAllFilters }
        data-testid="button-remove-filters"
      >
        Delete all
      </button>
    </div>
  );
}

export default Header;
