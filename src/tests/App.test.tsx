import React from 'react';
import { vi } from 'vitest'
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from "./helpers/mockData";
import App from '../App.js';
import PlanetsProvider from '../context/PlanetsProvider';

describe('Star Wars Planet Search App tests', () => {
  beforeEach(() => {
    const MOCK_RESPONSE = { json: async () => mockData } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE)
  })

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('1 - Tests if the Header elements render correctly', () => {
    render(<App />)

    screen.getByTestId('name-filter')
    screen.getByTestId('column-filter')
    screen.getByTestId('comparison-filter')
    screen.getByTestId('value-filter')
    screen.getByTestId('button-filter')
    screen.getByTestId('button-remove-filters')
    screen.getByTestId('column-sort')
    screen.getByTestId('column-sort-input-asc')
    screen.getByTestId('column-sort-input-desc')
    screen.getByTestId('column-sort-button')
    screen.getByRole('columnheader', { name: /name/i })
    screen.getByRole('columnheader', { name: /rotation period/i })
    screen.getByRole('columnheader', { name: /orbital period/i })
    screen.getByRole('columnheader', { name: /diameter/i })
    screen.getByRole('columnheader', { name: /climate/i })
    screen.getByRole('columnheader', { name: /gravity/i })
    screen.getByRole('columnheader', { name: /terrain/i })
    screen.getByRole('columnheader', { name: /surface water/i })
    screen.getByRole('columnheader', { name: /population/i })
  })

  test('2 - Tests all the functionalities combined', async () => {
    await act(async () => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>,
      )
    });

    const inputName = screen.getByTestId('name-filter')
    const columnFilter = screen.getByTestId('column-filter')
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const filterButton = screen.getByTestId('button-filter')

    const tatooine = screen.getByRole('cell', { name: /tatooine/i })
    const coruscant = screen.getByRole('cell', { name: /coruscant/i })
    const yavin = screen.getByRole('cell', { name: /yavin iv/i })
    const kamino = screen.getByRole('cell', { name: /kamino/i })


    expect(tatooine).toBeInTheDocument()
    expect(coruscant).toBeInTheDocument()
    expect(yavin).toBeInTheDocument()
    expect(kamino).toBeInTheDocument()

    await userEvent.type(inputName, 'o')

    expect(yavin).not.toBeInTheDocument()

    await userEvent.selectOptions(columnFilter, 'orbital_period')
    await userEvent.selectOptions(comparisonFilter, 'menor que')
    await userEvent.type(valueFilter, '400')
    await userEvent.click(filterButton)

    expect(tatooine).toBeInTheDocument()
    expect(coruscant).toBeInTheDocument()
    expect(kamino).not.toBeInTheDocument
  })

});
