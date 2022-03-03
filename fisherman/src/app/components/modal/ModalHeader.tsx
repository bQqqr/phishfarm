import { ModalHeader as ChakraModalHeader } from '@chakra-ui/react';

interface IProps {
  children: React.ReactNode;
}

export const ModalHeader = ({ children }: IProps) => {
  return <ChakraModalHeader>{children}</ChakraModalHeader>;
};
