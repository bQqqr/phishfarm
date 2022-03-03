import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import { AppProvider } from 'app/context/AppProvider';
import { Layout } from './Layout';
import { AuthProvider } from './AuthProvider';
import { RecoilRoot } from 'recoil';

export const App = () => {
  // Returns
  return (
    <BrowserRouter>
      <RecoilRoot>
        <ChakraProvider>
          <AppProvider>
            <AuthProvider>
              <Suspense fallback={<Spinner />}>
                <Layout />
              </Suspense>
            </AuthProvider>
          </AppProvider>
        </ChakraProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
};
