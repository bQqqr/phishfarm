import { useRecoilState } from 'recoil';
import { isAuthAtom } from 'app/global';
import { Login } from 'features/auth';
import { Routes } from './Routes';

export const Layout = () => {
  // Hooks
  const [isAuth] = useRecoilState(isAuthAtom);

  // Returns
  if (isAuth) return <Routes />;
  else return <Login />;
};
