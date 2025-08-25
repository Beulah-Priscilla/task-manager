import { render, screen } from "@testing-library/react";
import App from "./App";
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('render Task Manager title', () => {
  mockedAxios.get.mockResolvedValueOnce({ data: [] });
  render(<App />);
  expect(screen.getByText(/Task Manager/i)).toBeInTheDocument();
});

test('loads and shows tasks from backend', async () => {
  mockedAxios.get.mockResolvedValueOnce({
    data: [
      { id: 1, title: 'Learn FastAPI', completed: false },
      { id: 2, title: 'Build frontend', completed: true },
    ],
  });
  render(<App />);

  expect(await screen.findByText('Learn FastAPI')).toBeInTheDocument();
  expect(screen.getByText('Build frontend')).toBeInTheDocument();
})