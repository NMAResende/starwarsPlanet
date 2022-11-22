import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import StarWarsContext from './context/StarWarsContext';
import requestAPI from './services/RequestAPI';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    requestAPI().then((result) => setData(result));
  }, []);

  const value = useMemo(() => ({
    data,
  }), [data]);
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
