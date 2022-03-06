import { useRecoilState } from 'recoil';
import { isAuthAtom } from 'app/global';
import { Login } from 'features/auth';
import { DataProvider } from './DataProvider';
import { Setup } from './Setup';

export const Layout = () => {
  // Hooks
  const [isAuth] = useRecoilState(isAuthAtom);

  // Returns
  if (isAuth)
    return (
      <DataProvider>
        <Setup />
      </DataProvider>
    );
  else return <Login />;
};
