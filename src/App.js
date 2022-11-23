import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import StarWarsContext from './context/StarWarsContext';
import requestAPI from './services/RequestAPI';

function App() {
  const [inputs, setInputs] = useState({
    column: 'population',
    operator: 'maior que',
    number: 0,
  });
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState([]);
  const [columnFilter, setColumnFilter] = useState([]);
  const [saveFilter, setSaveFilter] = useState([]);

  useEffect(() => {
    requestAPI().then((result) => setData(result));
  }, []);

  const value = useMemo(() => ({
    data,
    filter,
    setFilter,
    inputs,
    setInputs,
    search,
    setSearch,
    columnFilter,
    setColumnFilter,
    saveFilter,
    setSaveFilter,
  }), [data, filter, setFilter, inputs,
    setInputs, search, setSearch, columnFilter, setColumnFilter,
    saveFilter, setSaveFilter]);

  return (
    <div>
      <StarWarsContext.Provider value={ value }>
        <span>Star Wars</span>
        <Header />
        <Table />
      </StarWarsContext.Provider>
    </div>
  );
}

export default App;
