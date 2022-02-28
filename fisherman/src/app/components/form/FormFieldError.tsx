import { FormErrorMessage, FormErrorMessageProps } from '@chakra-ui/react';

export const FormFieldError = ({ children, ...props }: FormErrorMessageProps) => {
  return <FormErrorMessage {...props}>{children}</FormErrorMessage>;
};
