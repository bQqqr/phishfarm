import { forwardRef, Input, InputProps } from '@chakra-ui/react';

export const FormFieldInput = forwardRef<InputProps, 'input'>((props, ref) => (
  <Input ref={ref} {...props} />
));
