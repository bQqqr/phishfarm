import { Button, Divider, Heading, VStack } from '@chakra-ui/react';
import { Tabs } from 'app/components';
import { AppCtx } from 'app/context';
import { useContext } from 'react';
import { EmailConfigurationForm } from '../components';

export const Setup = () => {
  const app = useContext(AppCtx);

  return (
    <VStack spacing={5} p={5}>
      <Heading>⛰️ Farm Configuration Page</Heading>
      <Tabs mt={5}>
        <Tabs.List>
          <Tabs.List.Tab>⚙️ Email Configuration</Tabs.List.Tab>
          <Tabs.List.Tab>🖌️ Message Template</Tabs.List.Tab>
          <Tabs.List.Tab>👯 Targets</Tabs.List.Tab>
          <Tabs.List.Tab>📱 Telegram</Tabs.List.Tab>
          <Tabs.List.Tab>🪂 Virus Total</Tabs.List.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panels.Panel>
            <EmailConfigurationForm />
          </Tabs.Panels.Panel>
          <Tabs.Panels.Panel>2</Tabs.Panels.Panel>
          <Tabs.Panels.Panel>3</Tabs.Panels.Panel>
          <Tabs.Panels.Panel>4</Tabs.Panels.Panel>
          <Tabs.Panels.Panel>5</Tabs.Panels.Panel>
        </Tabs.Panels>
      </Tabs>
      <Divider />
      <Button onClick={app.logout}>🧹 Login in another Farm</Button>
    </VStack>
  );
};
