import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';

describe('Testando a aplicação Star Wars', () => {
  test('Verificar se o texto Star Wars esta impresso na tela', () => {
    render(<App />);
    const text = screen.getByText(/Star Wars/i);

    expect(text).toBeInTheDocument();
  });

  test('Verificar se existe um input de pesquisa', () => {
    render(<App />);
    const inputName = screen.getByText(/Pesquisar planeta/i);
    userEvent.type(inputName, 'Endor');
    expect(inputName).toBeInTheDocument();
  });

  test('Verificar se existe um select de Coluna', () => {
    render(<App />);
    const inputColumn = screen.getByTestId('column-filter');
    expect(inputColumn).toHaveValue('population');
  });

  test('Verificar se existe um select de Operador', () => {
    render(<App />);
    const inputOperator = screen.getByTestId('comparison-filter');
    expect(inputOperator).toHaveValue('maior que');
  });

  test('Verificar se existe um texto com o valor 0', () => {
    render(<App />);
    const text = screen.getByTestId('value-filter');
    expect(text).toBeInTheDocument();
  });

  test('Verificar se existe um botão clicavel na tela', () => {
    render(<App />);

    const buttonFilter = screen.getByRole('button', { name: /Filtrar/i });

    expect(buttonFilter).toBeInTheDocument();
  });

  test('Verificar se existe uma tabela impresa na tela', () => {
    render(<App />);
    const name = screen.getAllByText(/Name/i);
    const rotationPeriod = screen.getAllByText(/Rotation Period/i);
    const orbitalPeriod = screen.getAllByText(/Orbital Period/i);
    const diameter = screen.getAllByText(/Diameter/i);
    const climate = screen.getAllByText(/Climate/i);
    const gravity = screen.getAllByText(/Gravity/i);
    const terrain = screen.getAllByText(/Terrain/i);
    const surfaceWater = screen.getAllByText(/Surface water/i);
    const population = screen.getAllByText(/Population/i);
    const films = screen.getAllByText(/Films/i);
    const created = screen.getAllByText(/Created/i);
    const edited = screen.getAllByText(/Edited/i);
    const url = screen.getAllByText(/Url/i);
    
    userEvent.type(name, 'Tatooine');
    userEvent.type(rotationPeriod, '23');
    userEvent.type(orbitalPeriod, '304');
    userEvent.type(diameter, '10465');
    userEvent.type(climate, 'arid');
    userEvent.type(gravity, '1');
    userEvent.type(terrain, 'desert');
    userEvent.type(surfaceWater, '1');
    userEvent.type(population, '200000');
    userEvent.type(films, 'https://swapi.dev/api/films/1/https://swapi.dev/api/films/3/https://swapi.dev/api/films/4/https://swapi.dev/api/films/5/https://swapi.dev/api/films/6/	');
    userEvent.type(created, '2014-12-09T13:50:49.641000Z');
    userEvent.type(edited, '2014-12-20T20:58:18.411000Z');
    userEvent.type(url, 'https://swapi.dev/api/planets/1/');
  });
});
