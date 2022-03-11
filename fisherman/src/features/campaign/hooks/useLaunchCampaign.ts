import { useToast } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { useAxios } from 'app/hooks';
import { CampaignSettings, LaunchCampaignRequest } from 'features/campaign';
import { campaignSettingsAtom, tabsIndexAtom } from 'app/global';

export const useLaunchCampaign = () => {
  // Hooks
  const { launchCampaign } = useAxios();
  const toast = useToast();
  const setSettings = useSetRecoilState(campaignSettingsAtom);
  const setTabIndex = useSetRecoilState(tabsIndexAtom);

  // Functions
  const command = async (req: LaunchCampaignRequest) => {
    const resp = await launchCampaign(req);
    if (resp.status === 204) {
      const settings = {
        isLaunched: true,
        launchDate: req.launchDate,
        timeInterval: req.timeInterval,
      } as CampaignSettings;

      setSettings(settings);

      setTabIndex(5);

      toast({
        title: 'Campaign was launched successfully.',
        status: 'success',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  // Returns
  return command;
};
