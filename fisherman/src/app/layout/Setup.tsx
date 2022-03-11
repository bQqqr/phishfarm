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
import { useAxios } from 'app/hooks';
import { LaunchCampaignForm } from 'features/campaign';
import { EmailSettingsForm, TestEmailForm } from 'features/email';
import { TargetsTable } from 'features/target';
import { MessageTemplateEditor } from 'features/template';

export const Setup = () => {
  // Hooks
  const [index, setIndex] = useRecoilState(tabsIndexAtom);
  const emailSettings = useRecoilValue(emailSettingsAtom);
  const templateSettings = useRecoilValue(templateSettingsAtom);
  const targets = useRecoilValue(targetsAtom);
  const campaignSettings = useRecoilValue(campaignSettingsAtom);
  const { logout } = useAxios();

  // Checklist
  const emailStepCompleted = emailSettings?.isConfigured;
  const templateStepCompleted = templateSettings?.isConfigured;
  const testStepCompleted = emailSettings?.isTested;
  const targetsStepCompleted = targets.length > 0;
  const launchStepCompleted = campaignSettings?.isLaunched;

  // Tabs
  const testTabDisabled = !emailStepCompleted || !templateStepCompleted;
  const targetsTabDisabled = !testStepCompleted;
  const launchTabDisabled = !testStepCompleted || !targetsStepCompleted;
  const statsTabDisabled = !campaignSettings?.isLaunched;

  // Inputs
  const emailFormDisabled = campaignSettings?.isLaunched;
  const templateFormDisabled = campaignSettings?.isLaunched;
  const testFormDisabled = campaignSettings?.isLaunched;
  const targetsTableDisabled = campaignSettings?.isLaunched;
  const launchFormDisabled = campaignSettings?.isLaunched;

  // Returns
  return (
    <VStack spacing={5} p={5} w="100%">
      <Heading size="lg">🎣 Fishing Farm</Heading>
      <HStack>
        <Button
          colorScheme="orange"
          variant="outline"
          size="sm"
          onClick={logout}
        >
          🧹 Log out
        </Button>
      </HStack>
      <Box>
        <Tabs
          defaultIndex={campaignSettings?.isLaunched ? 6 : 0}
          w="1200px"
          index={index}
          onChange={(index: number) => setIndex(index)}
          mt={5}
          size="sm"
        >
          <Tabs.List whiteSpace="nowrap">
            <Tabs.List.Tab>
              ⚙️ Email Settings {emailStepCompleted ? '✅' : '❌'}
            </Tabs.List.Tab>
            <Tabs.List.Tab>
              🖌️ Template Settings {templateStepCompleted ? '✅' : '❌'}
            </Tabs.List.Tab>
            <Tabs.List.Tab isDisabled={testTabDisabled}>
              🧪 Testing {testStepCompleted ? '✅' : '❌'}
            </Tabs.List.Tab>
            <Tabs.List.Tab isDisabled={targetsTabDisabled}>
              🍥Targets Specification {targetsStepCompleted ? '✅' : '❌'}
            </Tabs.List.Tab>
            <Tabs.List.Tab isDisabled={launchTabDisabled}>
              🏁 Launch Campaign {launchStepCompleted ? '✅' : '❌'}
            </Tabs.List.Tab>
            <Tabs.List.Tab isDisabled={statsTabDisabled}>
              📊 Campaign Statistics {launchStepCompleted ? '🚀' : '🔭'}
            </Tabs.List.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panels.Panel>
              <EmailSettingsForm isDisabled={emailFormDisabled!} />
            </Tabs.Panels.Panel>
            <Tabs.Panels.Panel>
              <MessageTemplateEditor isDisabled={templateFormDisabled!} />
            </Tabs.Panels.Panel>
            <Tabs.Panels.Panel>
              <TestEmailForm isDisabled={testFormDisabled!} />
            </Tabs.Panels.Panel>
            <Tabs.Panels.Panel>
              <TargetsTable isDisabled={targetsTableDisabled!} />
            </Tabs.Panels.Panel>
            <Tabs.Panels.Panel>
              <LaunchCampaignForm isDisabled={launchFormDisabled!} />
            </Tabs.Panels.Panel>
          </Tabs.Panels>
        </Tabs>
      </Box>
    </VStack>
  );
};
