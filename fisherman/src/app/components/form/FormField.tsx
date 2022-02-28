import { FormControl, FormControlProps } from '@chakra-ui/react';

import { FormFieldCheckbox } from './FormFieldCheckbox';
import { FormFieldDesc } from './FormFieldDesc';
import { FormFieldError } from './FormFieldError';
import { FormFieldInput } from './FormFieldInput';
import { FormFieldLabel } from './FormFieldLabel';
import { FormFieldNumber } from './FormFieldNumber';
import { FormFieldSelect } from './FormFieldSelect';

export const FormField = ({ children, ...props }: FormControlProps) => {
  return <FormControl {...props}>{children}</FormControl>;
};

FormField.Checkbox = FormFieldCheckbox;
FormField.Desc = FormFieldDesc;
FormField.Error = FormFieldError;
FormField.Input = FormFieldInput;
FormField.Label = FormFieldLabel;
FormField.Number = FormFieldNumber;
FormField.Select = FormFieldSelect;
