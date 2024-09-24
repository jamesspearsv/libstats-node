import App from './App';
import Home from './pages/Home';
import Record from './pages/Record';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'record', element: <Record /> },
      { path: 'reports', element: 'TODO -- Reports Panel' },
      { path: 'admin', element: 'TODO -- Admin Dashboard' },
    ],
  },
];

export default routes;
