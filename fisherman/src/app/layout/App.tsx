import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from './Layout';
import { AuthProvider } from './AuthProvider';

export const App = () => {
  // Returns
  return (
    <RecoilRoot>
      <ChakraProvider>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
};
