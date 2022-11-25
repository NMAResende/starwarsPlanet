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
});
