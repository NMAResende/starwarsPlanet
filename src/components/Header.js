import React, { useContext, useEffect } from 'react';
import '../App.css';
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
      <img
        className="image"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/SW_opening_crawl_logo.svg/1200px-SW_opening_crawl_logo.svg.png"
        alt="Star Wars"
      />
      <br />
      <label htmlFor="search" className="labelSearch">
        Pesquisar planeta
        <input
          data-testid="name-filter"
          type="text"
          name="search"
          id="search"
          className="search"
          onChange={ (e) => setFilter(e.target.value) }
        />
      </label>
      <form className="form">
        <label htmlFor="column" className="labelColumn">
          Coluna
          <select
            name="column"
            id="column"
            className="column"
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
        <label htmlFor="operator" className="labelOperator">
          Operador
          <select
            id="operator"
            name="operator"
            className="operator"
            value={ inputs.operator }
            data-testid="comparison-filter"
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="number" className="labelNumber">
          <input
            type="number"
            name="number"
            id="number"
            className="number"
            value={ inputs.number }
            data-testid="value-filter"
            onChange={ handleChange }
          />
        </label>
        <button
          className="btnFilter"
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
      <ul className="filter">
        {
          saveFilter.map((el, i) => (
            <li key={ i } data-testid="filter">
              <p>{`${el.column} ${el.operator} ${el.number}`}</p>
              <button
                className="delete"
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
        className="deleteAll"
        onClick={ handleRemoveAllFilters }
        data-testid="button-remove-filters"
      >
        Delete all
      </button>
    </div>
  );
}

export default Header;
