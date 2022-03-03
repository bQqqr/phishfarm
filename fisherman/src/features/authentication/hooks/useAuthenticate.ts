import { useRecoilState } from 'recoil';
import { isAuthAtom, jwtAtom } from 'app/global';
import { useAgent } from 'app/hooks';

export const useAuthenticate = () => {
  // Hooks
  const [, setJwt] = useRecoilState(jwtAtom);
  const [, setIsAuth] = useRecoilState(isAuthAtom);
  const { agent } = useAgent();

  // Functions
  function onAuthenticated(token: string) {
    localStorage.setItem('farm.jwt', token);
    setJwt(token);
    setIsAuth(true);
  }

  async function authenticate(pw: string) {
    const resp = await agent.authenticate({ password: pw });

    if (resp?.data?.token) onAuthenticated(resp.data.token);
  }

  // Returns
  return { authenticate };
};
