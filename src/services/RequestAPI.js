const requestAPI = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const { results } = await response.json();
    const remove = results.filter((el) => el !== 'residents');
    return remove;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default requestAPI;
