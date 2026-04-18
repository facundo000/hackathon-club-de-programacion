import { render, screen } from '@testing-library/react';
import App from './App';

test('muestra dashboard en la ruta por defecto', () => {
  window.history.pushState({}, '', '/');
  render(<App />);
  const brandElement = screen.getByRole('link', { name: /boardgame social/i });
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

test('muestra login en la ruta /login', () => {
  window.history.pushState({}, '', '/login');
  render(<App />);
  expect(screen.getByRole('heading', { name: /iniciar sesion/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
});
