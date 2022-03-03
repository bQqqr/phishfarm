import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { apiAtom, isAuthAtom, jwtAtom } from 'app/global';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  // Hooks
  const [, setApi] = useRecoilState(apiAtom);
  const [, setJwt] = useRecoilState(jwtAtom);
  const [, setIsAuth] = useRecoilState(isAuthAtom);

  // Functions
  const handleAuthenticated = useCallback(
    (api: string, jwt: string) => {
      setApi(api);
      setJwt(jwt);
      setIsAuth(true);
    },
    [setApi, setJwt, setIsAuth],
  );

  // Boostrap
  useEffect(() => {
    const localstorageHost = localStorage.getItem('farm.api');
    const localstorageJwt = localStorage.getItem('farm.jwt');

    if (localstorageHost && localstorageJwt)
      handleAuthenticated(localstorageHost, localstorageJwt);
  }, [handleAuthenticated]);

  return <>{children}</>;
};
