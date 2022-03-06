import { useSetRecoilState } from 'recoil';
import { isAuthAtom, jwtAtom } from 'app/global';
import { useAgent } from 'app/hooks';

export const useAuthenticate = () => {
  // Hooks
  const { agent } = useAgent();
  const setJwt = useSetRecoilState(jwtAtom);
  const setIsAuth = useSetRecoilState(isAuthAtom);

  // Functions
  const onAuthenticated = (token: string) => {
    localStorage.setItem('farm.jwt', token);
    setJwt(token);
    setIsAuth(true);
  };

  async function authenticate(pw: string) {
    const resp = await agent.getToken({ password: pw });

    if (resp?.data?.token) onAuthenticated(resp.data.token);
  }

  // Returns
  return { authenticate };
};
