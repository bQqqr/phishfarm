import { useRecoilState } from 'recoil';
import { isAuthAtom } from 'app/global';
import { Login } from 'features/authentication';
import { Routes } from './Routes';
import { DataProvider } from './DataProvider';

export const Layout = () => {
  // Hooks
  const [isAuth] = useRecoilState(isAuthAtom);

  // Returns
  if (isAuth)
    return (
      <DataProvider>
        <Routes />
      </DataProvider>
    );
  else return <Login />;
};
