import { Button, ButtonProps } from '@chakra-ui/react';

export const FormButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button type="submit" {...props}>
      {children}
    </Button>
  );
};
