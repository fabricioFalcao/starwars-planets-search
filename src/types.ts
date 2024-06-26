export type PlanetType = {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string
  terrain: string,
  surface_water: string,
  population: string,
  films: string[],
  created: string,
  edited: string,
  url: string
};

export type NumberFilterType = {
  column: string,
  comparison: string,
  parameter: number,
};

export type SortType = {
  column: string,
  sort: string
};
