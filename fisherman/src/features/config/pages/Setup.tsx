import { Button, Divider, Heading, VStack } from '@chakra-ui/react';
import { Tabs } from 'app/components';
import { AppCtx } from 'app/context';
import { useContext } from 'react';
import {
  ConfirmAndLaunch,
  TargetsTable,
  EmailConfigurationForm,
  MessageTemplateEditor,
} from 'features/config';

export const Setup = () => {
  // Hooks
  const [jwt, setJwt] = 
  // Functions
  const onLogout = () => {

  }

  return (
    <VStack spacing={5} p={5} w="100%">
      <Heading size="lg">Farm Configuration Page</Heading>
      <Button onClick={app.logout}>🧹 Login in another Farm</Button>
      <Tabs align="center" mt={5} size="sm">
        <Tabs.List>
          <Tabs.List.Tab>⚙️ Email Config</Tabs.List.Tab>
          <Tabs.List.Tab>🖌️ Message Template</Tabs.List.Tab>
          <Tabs.List.Tab>👯 Targets</Tabs.List.Tab>
          <Tabs.List.Tab isDisabled>📱 Telegram</Tabs.List.Tab>
          <Tabs.List.Tab isDisabled>🪂 Virus Total</Tabs.List.Tab>
          <Tabs.List.Tab>🏁 Confirm and Launch</Tabs.List.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panels.Panel>
            <EmailConfigurationForm />
          </Tabs.Panels.Panel>
          <Tabs.Panels.Panel>
            <MessageTemplateEditor />
          </Tabs.Panels.Panel>
          <Tabs.Panels.Panel>
            <TargetsTable />
          </Tabs.Panels.Panel>
          <Tabs.Panels.Panel>4</Tabs.Panels.Panel>
          <Tabs.Panels.Panel>5</Tabs.Panels.Panel>
          <Tabs.Panels.Panel>
            <ConfirmAndLaunch />
          </Tabs.Panels.Panel>
        </Tabs.Panels>
      </Tabs>
    </VStack>
  );
};
