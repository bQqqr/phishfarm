import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from './Layout';
import { AuthProvider } from './AuthProvider';

export const App = () => {
  // Returns
  return (
    <BrowserRouter>
      <RecoilRoot>
        <ChakraProvider>
          <AuthProvider>
            <Layout />
          </AuthProvider>
        </ChakraProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
};
