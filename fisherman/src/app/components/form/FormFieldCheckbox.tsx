import { Checkbox, CheckboxProps, forwardRef } from '@chakra-ui/react';

export const FormFieldCheckbox = forwardRef<CheckboxProps, 'input'>((props, ref) => (
  <Checkbox ref={ref} {...props} />
));
