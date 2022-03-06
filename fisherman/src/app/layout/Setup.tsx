import { Box, Button, Heading, HStack, VStack } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Tabs } from 'app/components';
import {
  campaignSettingsAtom,
  emailSettingsAtom,
  tabsIndexAtom,
  targetsAtom,
  templateSettingsAtom,
} from 'app/global';
import { useAgent } from 'app/hooks';
import { LaunchCampaignForm } from 'features/campaign';
import { EmailSettingsForm, TestEmailForm } from 'features/email';
import { TargetsTable } from 'features/target';
import { MessageTemplateEditor } from 'features/template';
import { useEffect } from 'react';

export const Setup = () => {
  // Hooks
  const [index, setIndex] = useRecoilState(tabsIndexAtom);
  const emailSettings = useRecoilValue(emailSettingsAtom);
  const templateSettings = useRecoilValue(templateSettingsAtom);
  const targets = useRecoilValue(targetsAtom);
  const campaignSettings = useRecoilValue(campaignSettingsAtom);
  const { agent } = useAgent();

  // Boostrap
  useEffect(() => {
    if (campaignSettings?.isLaunched) setIndex(6);
  }, [campaignSettings?.isLaunched, setIndex]);

  // Disables
  const emailDisable = campaignSettings?.isLaunched;
  const templateDisable = campaignSettings?.isLaunched;
  const testDisable =
    !emailSettings?.isConfigured ||
    !templateSettings?.isConfigured ||
    campaignSettings?.isLaunched;
  const targetsDisable =
    !emailSettings?.isTested || campaignSettings?.isLaunched;
  const campaignDisable =
    !emailSettings?.isConfigured ||
    !templateSettings?.isConfigured ||
    targets.length === 0 ||
    campaignSettings?.isLaunched;
  const statsDisable = !campaignSettings?.isLaunched;

  // Returns
  return (
    <VStack spacing={5} p={5} w="100%">
      <Heading size="lg">🎣 Fishing Farm</Heading>
      <HStack>
        <Button
          colorScheme="orange"
          variant="outline"
          size="sm"
          onClick={agent.logout}
        >
          🧹 Clear Authentication Token
        </Button>
      </HStack>
      <Box w="1500px">
        <Tabs
          index={index}
          onChange={(index: number) => setIndex(index)}
          mt={5}
          size="sm"
        >
          <Tabs.List whiteSpace="nowrap">
            <Tabs.List.Tab isDisabled={emailDisable}>
              ⚙️ Email Settings {emailSettings?.isConfigured ? '✅' : '❓'}
            </Tabs.List.Tab>
            <Tabs.List.Tab isDisabled>📷 Logo Canary ❓</Tabs.List.Tab>
            <Tabs.List.Tab isDisabled={templateDisable}>
              🖌️ Message Settings {templateSettings?.isConfigured ? '✅' : '❓'}
            </Tabs.List.Tab>
            <Tabs.List.Tab isDisabled={testDisable}>
              🧪 Testing {emailSettings?.isTested ? '✅' : '❓'}
            </Tabs.List.Tab>
            <Tabs.List.Tab isDisabled={targetsDisable}>
              🍥Targets Specification {targets.length > 0 ? '✅' : '❓'}
            </Tabs.List.Tab>
            <Tabs.List.Tab isDisabled={campaignDisable}>
              🏁 Launch Campaign {campaignSettings?.isLaunched ? '✅' : '❓'}
            </Tabs.List.Tab>
            <Tabs.List.Tab isDisabled={statsDisable}>
              📊 Campaign Statistics
            </Tabs.List.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panels.Panel>
              <EmailSettingsForm />
            </Tabs.Panels.Panel>
            <Tabs.Panels.Panel>
              <MessageTemplateEditor />
            </Tabs.Panels.Panel>
            <Tabs.Panels.Panel>
              <TestEmailForm />
            </Tabs.Panels.Panel>
            <Tabs.Panels.Panel>
              <TargetsTable />
            </Tabs.Panels.Panel>
            <Tabs.Panels.Panel>
              <LaunchCampaignForm />
            </Tabs.Panels.Panel>
          </Tabs.Panels>
        </Tabs>
      </Box>
    </VStack>
  );
};
