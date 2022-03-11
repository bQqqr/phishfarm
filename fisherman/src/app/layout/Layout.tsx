import { useRecoilValue } from 'recoil';
import { isAuthAtom } from 'app/global';
import { Login } from 'features/auth';
import { DataProvider } from './DataProvider';
import { Setup } from './Setup';

export const Layout = () => {
  // Hooks
  const isAuth = useRecoilValue(isAuthAtom);

  // Returns
  if (isAuth)
    return (
      <DataProvider>
        <Setup />
      </DataProvider>
    );
  else return <Login />;
};
