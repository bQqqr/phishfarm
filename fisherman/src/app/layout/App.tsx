import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import { AppProvider } from 'app/context/AppProvider';
import { Layout } from './Layout';

export const App = () => {
  // Returns
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AppProvider>
          <Suspense fallback={<Spinner />}>
            <Layout />
          </Suspense>
        </AppProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};
