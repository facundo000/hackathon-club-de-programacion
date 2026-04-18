import { render, screen } from '@testing-library/react';
import App from './App';

test('muestra la pantalla de inicio de sesion', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', { name: /iniciar sesion/i });
  expect(titleElement).toBeInTheDocument();
});
