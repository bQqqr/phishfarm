import { useRecoilState } from 'recoil';
import { useToast } from '@chakra-ui/react';
import { isAuthAtom, jwtAtom } from 'app/global';
import { useAgent } from 'app/hooks';

export const useAuthenticate = () => {
  // Hooks
  const [, setJwt] = useRecoilState(jwtAtom);
  const [, setIsAuth] = useRecoilState(isAuthAtom);
  const { agent } = useAgent();
  const toast = useToast();

  // Functions
  function onNotAuthenticated() {
    toast({
      title: 'The password that you have entered is wrong.',
      status: 'error',
      isClosable: true,
      duration: 2000,
    });
  }

  function onAuthenticated(token: string) {
    localStorage.setItem('farm.jwt', token);
    setJwt(token);
    setIsAuth(true);
  }

  async function authenticate(pw: string) {
    // Last execute and handle the response.
    const resp = await agent.authenticate({ password: pw });

    switch (resp.statusCode) {
      case 401:
        onNotAuthenticated();
        break;
      case 200:
        onAuthenticated(resp.data.token);
        break;
      default:
        break;
    }
  }

  // Returns
  return { authenticate };
};
