import { TabList, TabListProps } from '@chakra-ui/react';

import { TabsListTab } from './TabsListTab';

export const TabsList = ({ children, ...props }: TabListProps) => {
  return <TabList {...props}>{children}</TabList>;
};

TabsList.Tab = TabsListTab;
