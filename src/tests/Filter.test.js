import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import mockData from './mockData';

const columnFilter = 'column-filter';
const operatorFilter = 'comparison-filter';
const numberFilter = 'value-filter';
const orbitalPeriod = 'orbital_period';

describe('Testando o fetch e as aplicações', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
  });

  afterEach(() => jest.clearAllMocks());

  test('Verificando a requisição da API', async () => {
    render(<App />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/planets',
    );

    expect(await screen.findByRole('table')).toBeInTheDocument();
  });

  test('Verificar se existe um filtro de Nome', async () => {
    render(<App />);

    const filterName = screen.getByTestId('name-filter');
    expect(filterName).toBeInTheDocument();
    userEvent.type(filterName, 'oo');

    const name = await screen.findByRole('cell', { name: /Tatooine/i });
    expect(name).toBeInTheDocument();
  });

  test('Verificar se existe um botão que filtra os seletores', async () => {
    render(<App />);

    const column = screen.getByTestId(columnFilter);
    const operator = screen.getByTestId(operatorFilter);
    const number = screen.getByTestId(numberFilter);
    userEvent.type(column, 'population');
    userEvent.type(operator, 'maior que');
    userEvent.type(number, '0');

    const buttonFilter = screen.getByRole('button', { name: /Filtrar/i });
    userEvent.click(buttonFilter);
  });

  test('Verificar se existe um seletor maior que', async () => {
    render(<App />);

    const alderaan = await screen.findByRole('cell', { name: /Alderaan/i });

    const column = screen.getByTestId(columnFilter);
    const operator = screen.getByTestId(operatorFilter);
    const number = screen.getByTestId(numberFilter);
    userEvent.selectOptions(column, orbitalPeriod);
    userEvent.type(operator, 'maior que');
    userEvent.type(number, '400');
    const buttonFilter = screen.getByRole('button', { name: /Filtrar/i });
    userEvent.click(buttonFilter);

    const endor = await screen.findByRole('cell', { name: /Endor/i });
    expect(endor).toBeInTheDocument();
    expect(alderaan).not.toBeInTheDocument();
  });

  test('Verificar se existe um seletor menor que', async () => {
    render(<App />);

    const endor = await screen.findByRole('cell', { name: /Endor/i });

    const column = screen.getByTestId(columnFilter);
    const operator = screen.getByTestId(operatorFilter);
    const number = screen.getByTestId(numberFilter);
    userEvent.selectOptions(column, orbitalPeriod);
    userEvent.selectOptions(operator, 'menor que');
    userEvent.type(number, '310');
    const buttonFilter = screen.getByRole('button', { name: /Filtrar/i });
    userEvent.click(buttonFilter);

    const tatooine = await screen.findByRole('cell', { name: /Tatooine/i });
    expect(tatooine).toBeInTheDocument();
    expect(endor).not.toBeVisible();
  });

  test('Verificar se existe um seletor menor que', async () => {
    render(<App />);

    const endor = await screen.findByRole('cell', { name: /Endor/i });

    const column = screen.getByTestId(columnFilter);
    const operator = screen.getByTestId(operatorFilter);
    const number = screen.getByTestId(numberFilter);
    userEvent.selectOptions(column, orbitalPeriod);
    userEvent.selectOptions(operator, 'igual a');
    userEvent.type(number, '364');
    const buttonFilter = screen.getByRole('button', { name: /Filtrar/i });
    userEvent.click(buttonFilter);

    const alderaan = await screen.findByRole('cell', { name: /Alderaan/i });
    expect(alderaan).toBeInTheDocument();
    expect(endor).not.toBeVisible();
  });

  test('Verificar se existe um botão que deleta os filtros', async () => {
    render(<App />);

    const buttonFilter = screen.getByRole('button', { name: /Filtrar/i });
    userEvent.click(buttonFilter);

    const remove = screen.getAllByRole('button', { name: /Delete/i });
    expect(remove[0]).toBeInTheDocument();
    userEvent.click(remove[0]);
    expect(remove[0]).not.toBeVisible();
  });

  test('Verificar se existe um botão que deleta todos os filtros', async () => {
    render(<App />);

    const buttonFilter = screen.getByRole('button', { name: /Filtrar/i });
    userEvent.click(buttonFilter);

    const removeAll = await screen.findByTestId('button-remove-filters');
    expect(removeAll).toBeInTheDocument();
    userEvent.click(removeAll);
    expect(await screen.findByRole('table')).toBeInTheDocument();
  });
});
