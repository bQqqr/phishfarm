import { Tabs as ChakraTabs, TabsProps } from '@chakra-ui/react';

import { TabsList } from './TabsList';
import { TabsPanels } from './TabsPanels';

export const Tabs = ({ children, ...props }: TabsProps) => {
  return (
    <ChakraTabs isLazy {...props}>
      {children}
    </ChakraTabs>
  );
};

Tabs.List = TabsList;
Tabs.Panels = TabsPanels;
