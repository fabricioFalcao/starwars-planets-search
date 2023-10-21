import mockData from './mockData';

const mockFetch = () => ({
  status: 200,
  ok: true,
  json: async () => mockData,
} as Response);

export default mockFetch;