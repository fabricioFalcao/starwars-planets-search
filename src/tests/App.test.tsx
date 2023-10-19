import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Star Wars Planet Seacr App tests', () => {
  beforeEach(() => render(<App />))

  test('1 - Tests if the Header render correctly', () => {
    screen.getByTestId('name-filter')
    screen.getByTestId('column-filter')
    screen.getByTestId('comparison-filter')
    screen.getByTestId('value-filter')
    screen.getByTestId('button-filter')

  })

});
