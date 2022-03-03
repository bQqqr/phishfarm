import {
  DrawerBody as ChakraDrawerBody,
  ModalBodyProps,
} from '@chakra-ui/react';

interface IDrawerBodyProps extends ModalBodyProps {
  children: React.ReactNode;
}

export const DrawerBody = ({
  children,
  ...props
}: IDrawerBodyProps) => {
  return <ChakraDrawerBody {...props}>{children}</ChakraDrawerBody>;
};
