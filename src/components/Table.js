import { useContext } from 'react';
import '../App.css';
import StarWarsContext from '../context/StarWarsContext';

export default function Table() {
  const { data, filter, saveFilter } = useContext(StarWarsContext);

  // const filterName = () => {
  //   const dataFilter = data.filter((el) => el.name.toUpperCase()
  //     .includes(filter.toUpperCase()));
  //   if (filter.length > 0) {
  //     setSearch(dataFilter);
  //   } else {
  //     setSearch(data);
  //   }
  // };

  const allFilter = () => {
    const dataFilter = data.filter((el) => el.name.toUpperCase()
      .includes(filter.toUpperCase()));
    const filterByNameAndNumber = dataFilter.filter((el) => {
      const result = saveFilter.map(({ column, operator, number }) => {
        switch (operator) {
        case 'menor que':
          return +el[column] < +number;
        case 'maior que':
          return +el[column] > +number;
        case 'igual a':
          return +el[column] === +number;
        default:
          return true;
        }
      });
      return result.every((e) => e);
    });
    return filterByNameAndNumber;
  };

  // useEffect(() => {
  //   filterName();
  // }, [data, filter]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {
            allFilter().map((el) => (
              <tr key={ el.name }>
                <td>{el.name}</td>
                <td>{el.rotation_period}</td>
                <td>{el.orbital_period}</td>
                <td>{el.diameter}</td>
                <td>{el.climate}</td>
                <td>{el.gravity}</td>
                <td>{el.terrain}</td>
                <td>{el.surface_water}</td>
                <td>{el.population}</td>
                <td>{el.films.map((movie) => <div key={ movie }>movie</div>)}</td>
                <td>{el.created}</td>
                <td>{el.edited}</td>
                <td>{el.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
