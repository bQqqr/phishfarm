import { forwardRef, Select, SelectProps } from '@chakra-ui/react';

export const FormFieldSelect = forwardRef<SelectProps, 'select'>((props, ref) => (
  <Select ref={ref} {...props} />
));
