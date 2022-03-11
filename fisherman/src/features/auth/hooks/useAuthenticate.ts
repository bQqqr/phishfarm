import { useSetRecoilState } from 'recoil';
import { isAuthAtom, jwtAtom } from 'app/global';
import { useAxios } from 'app/hooks';

export const useAuthenticate = () => {
  // Hooks
  const { getToken } = useAxios();
  const setIsAuth = useSetRecoilState(isAuthAtom);
  const setJwt = useSetRecoilState(jwtAtom);

  // Functions
  async function authenticate(pw: string) {
    const resp = await getToken({ password: pw });

    if (resp.data.token) {
      localStorage.setItem('farm.jwt', resp.data.token);
      setJwt(resp.data.token);
      setIsAuth(true);
    }
  }

  // Returns
  return { authenticate };
};
