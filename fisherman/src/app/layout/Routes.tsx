import { lazy } from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

const Config = lazy(() =>
  import('features/config').then((mod) => ({
    default: mod.Setup,
  })),
);

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Config />} />
    </Switch>
  );
};
