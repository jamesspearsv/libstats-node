import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes.jsx';
import './index.css';

const router = createBrowserRouter(routes);

// Set api url based on env
const API_URL = import.meta.VITE_API_URL || 'localhost:3002';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
