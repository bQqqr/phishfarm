import { Tab, TabProps } from '@chakra-ui/react';

export const TabsListTab = ({ children, ...props }: TabProps) => {
  return <Tab {...props}>{children}</Tab>;
};
