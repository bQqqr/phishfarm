import { forwardRef, NumberInputField, NumberInputFieldProps } from '@chakra-ui/react';

export const FormFieldNumberInput = forwardRef<NumberInputFieldProps, 'input'>((props, ref) => (
  <NumberInputField ref={ref} {...props} />
));
