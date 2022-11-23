import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import mockData from './mockData';

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

  test('Verificando a requisição da API com renderização da tabela', async () => {

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    render(<App />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/planets');

      await waitFor(() => {
        const renderTable = screen.findByRole('table');
        expect(renderTable).toBeVisible();
      })
  });

  // test('Verificar se existe um filtro de Nome', async () => {

  //   global.fetch = jest.fn(() => Promise.resolve({
  //     json: () => Promise.resolve(mockData),
  //   }));

  //   render(<App />);

  //   await waitFor(() => {
  //     const filterName = screen.getByTestId('name-filter');
  //     userEvent.type(filterName, '0');
  //     const name = screen.getByText(/Hoth/i)
  //     expect(name).toBeInTheDocument();
  //   })
  // });

  // test('Verificar se existe um filtro de seletores', async () => {

  //   global.fetch = jest.fn(() => Promise.resolve({
  //     json: () => Promise.resolve(mockData),
  //   }));

  //   render(<App />);

  //   const filterColumn = screen.getByTestId('column-filter');
  //   userEvent.selectOptions(filterColumn, 'population');
  //   expect(filterColumn).toBeInTheDocument();
  //   const filterOperator = screen.getByTestId('comparison-filter');
  //   userEvent.selectOptions(filterOperator, 'maior que');
  //   expect(filterOperator).toBeInTheDocument();
  //   const filterNumber = screen.getByTestId('value-filter');
  //   userEvent.type(filterNumber, '0');
  //   expect(filterNumber).toBeInTheDocument();
  //   const buttonFilter = screen.getByRole('button', { name: /Filtrar/i });
  //   userEvent.click(buttonFilter);
  //   expect(buttonFilter).toBeInTheDocument();
  // });

});
