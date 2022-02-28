import { FormHelperText, HelpTextProps } from '@chakra-ui/react';
import React from 'react';

export const FormFieldDesc = ({ children, ...props }: HelpTextProps) => {
  return <FormHelperText {...props}>{children}</FormHelperText>;
};
