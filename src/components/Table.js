import { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Table() {
  const { data, filter, search, setSearch } = useContext(StarWarsContext);

  const filterName = () => {
    const dataFilter = data.filter((el) => el.name.toUpperCase()
      .includes(filter.toUpperCase()));
    if (filter.length > 0) {
      setSearch(dataFilter);
    } else {
      setSearch(data);
    }
  };

  useEffect(() => {
    filterName();
  }, [data, filter]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
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
            search.map((el) => (
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
                <td>{el.films.map((movie) => movie)}</td>
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
