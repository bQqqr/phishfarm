import {
  Drawer as ChakraDrawer,
  DrawerOverlay,
  DrawerProps,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import { DrawerHeader } from './DrawerHeader';
import { DrawerBody } from './DrawerBody';

interface IDrawerProps extends DrawerProps {
  children: React.ReactNode;
}

export const Drawer = ({ children, ...props }: IDrawerProps) => {
  return (
    <ChakraDrawer {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {children}
      </DrawerContent>
    </ChakraDrawer>
  );
};

Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
