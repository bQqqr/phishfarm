import { TabPanels, TabPanelsProps } from '@chakra-ui/react';

import { TabsPanel } from './TabsPanel';

export const TabsPanels = ({
  children,
  ...props
}: TabPanelsProps) => {
  return <TabPanels {...props}>{children}</TabPanels>;
};

TabsPanels.Panel = TabsPanel;
