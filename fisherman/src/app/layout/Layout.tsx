import { useContext } from 'react';

import { AppCtx } from 'app/context';
import { Login } from 'features/auth';
import { Routes } from './Routes';

export const Layout = () => {
  // Hooks
  const app = useContext(AppCtx);

  // Returns
  if (app.authenticated) return <Routes />;
  else return <Login />;
};
