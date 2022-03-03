import {
  ModalBody as ChakraModalBody,
  ModalBodyProps,
} from '@chakra-ui/react';

interface IProps extends ModalBodyProps {
  children: React.ReactNode;
}

export const ModalBody = ({ children, ...props }: IProps) => {
  return <ChakraModalBody {...props}>{children}</ChakraModalBody>;
};
