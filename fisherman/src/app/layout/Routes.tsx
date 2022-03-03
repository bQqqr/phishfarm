import { Route, Routes as Switch } from 'react-router-dom';
import { Setup } from 'features/configuration';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Setup />} />
    </Switch>
  );
};
