import { DrawerHeader as ChakraDrawerHeader } from '@chakra-ui/react';

interface IDrawerHeader {
  children: React.ReactNode;
}

export const DrawerHeader = ({ children }: IDrawerHeader) => {
  return <ChakraDrawerHeader>{children}</ChakraDrawerHeader>;
};
