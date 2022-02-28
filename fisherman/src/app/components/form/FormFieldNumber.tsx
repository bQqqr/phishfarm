import { NumberInput, NumberInputProps } from '@chakra-ui/react';

import { FormFieldNumberInput } from './FormFieldNumberInput';

export const FormFieldNumber = ({ children, ...props }: NumberInputProps) => {
  return <NumberInput {...props}>{children}</NumberInput>;
};

FormFieldNumber.Input = FormFieldNumberInput;
