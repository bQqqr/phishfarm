import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { apiAtom, isAuthAtom, jwtAtom } from 'app/global';
import { Spinner } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  // Hooks
  const [done, setDone] = useState(false);
  const setApi = useSetRecoilState(apiAtom);
  const setJwt = useSetRecoilState(jwtAtom);
  const setIsAuth = useSetRecoilState(isAuthAtom);

  // Boostrap
  useEffect(() => {
    const lsApi = localStorage.getItem('farm.api');
    const lsJwt = localStorage.getItem('farm.jwt');

    if (lsApi && lsJwt) {
      setApi(lsApi);
      setJwt(lsJwt);
      setIsAuth(true);
    }

    setDone(true);
  }, [setApi, setJwt, setIsAuth]);

  if (done) return <>{children}</>;
  else return <Spinner />;
};
