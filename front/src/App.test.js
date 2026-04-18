import { render, screen } from '@testing-library/react';
import App from './App';

test('muestra el header principal', () => {
  render(<App />);
  const brandElement = screen.getByText(/boardgame social/i);
  const searchElement = screen.getByPlaceholderText(/buscar juegos, personas, grupos/i);
  const composerElement = screen.getByPlaceholderText(/que juego has jugado hoy/i);
  const publishButton = screen.getByRole('button', { name: /publicar/i });
  const eventsHeading = screen.getByRole('heading', { name: /próximos eventos/i });
  const contactsHeading = screen.getByRole('heading', { name: /contactos/i });
  expect(brandElement).toBeInTheDocument();
  expect(searchElement).toBeInTheDocument();
  expect(composerElement).toBeInTheDocument();
  expect(publishButton).toBeInTheDocument();
  expect(eventsHeading).toBeInTheDocument();
  expect(contactsHeading).toBeInTheDocument();
});
