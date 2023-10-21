const fetchPlanets = async () => {
  const endpoint = 'https://swapi.dev/api/planets';

  try {
    const response = await fetch(endpoint);

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Unable to fetch data', error);
    throw error;
  }
};

export default fetchPlanets;
