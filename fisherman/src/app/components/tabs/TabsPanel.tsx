import { TabPanel, TabPanelProps } from '@chakra-ui/react';

export const TabsPanel = ({ children, ...props }: TabPanelProps) => {
  return <TabPanel {...props}>{children}</TabPanel>;
};
