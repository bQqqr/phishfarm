import { VStack } from '@chakra-ui/react';

import { FormButton } from './FormButton';
import { FormField } from './FormField';

export const Form = ({
  children,
  ...props
}: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) => {
  return (
    <form {...props}>
      <VStack align="start" spacing={5}>
        {children}
      </VStack>
    </form>
  );
};

Form.Button = FormButton;
Form.Field = FormField;
