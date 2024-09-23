import App from './App';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      // { index: true, element: 'Home' },
      { path: 'record', element: 'Record' },
      { path: 'reports', element: 'Reports' },
      { path: 'admin', element: 'Admin' },
    ],
  },
];

export default routes;
