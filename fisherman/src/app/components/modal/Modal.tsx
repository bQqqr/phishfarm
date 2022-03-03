import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalProps,
} from '@chakra-ui/react';

import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';

interface IProps extends ModalProps {
  children: React.ReactNode;
}

export const Modal = ({ children, ...props }: IProps) => {
  return (
    <ChakraModal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </ChakraModal>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
