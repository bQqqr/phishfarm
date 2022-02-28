import { FormLabel, FormLabelProps } from '@chakra-ui/react';

export const FormFieldLabel = ({ children, ...props }: FormLabelProps) => {
  return <FormLabel {...props}>{children}</FormLabel>;
};
