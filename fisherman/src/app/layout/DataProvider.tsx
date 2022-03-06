import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  campaignSettingsAtom,
  emailSettingsAtom,
  targetsAtom,
  templateSettingsAtom,
} from 'app/global/app';
import { useGetEmailSettings } from 'features/email';
import { useGetTemplateSettings } from 'features/template';
import { useGetTargets } from 'features/target';
import { useGetCampaignSettings } from 'features/campaign';

interface Props {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  // Hooks
  const emailQuery = useGetEmailSettings();
  const templateQuery = useGetTemplateSettings();
  const targetsQuery = useGetTargets();
  const campaignQuery = useGetCampaignSettings();
  const setEmailSettings = useSetRecoilState(emailSettingsAtom);
  const setTemplateSettings = useSetRecoilState(templateSettingsAtom);
  const setTargets = useSetRecoilState(targetsAtom);
  const setCampaignSettings = useSetRecoilState(campaignSettingsAtom);

  // Functions
  const handleSetup = useCallback(async () => {
    const emailDto = await emailQuery();
    const templateDto = await templateQuery();
    const targetsDto = await targetsQuery();
    const campaignDto = await campaignQuery();

    setTemplateSettings(templateDto.data);
    setEmailSettings(emailDto.data);
    setTargets(targetsDto.data ?? []);
    setCampaignSettings(campaignDto.data);
  }, [
    emailQuery,
    templateQuery,
    targetsQuery,
    campaignQuery,
    setEmailSettings,
    setTemplateSettings,
    setTargets,
    setCampaignSettings,
  ]);

  // Boostrap
  useEffect(() => {
    handleSetup();
  }, [handleSetup]);

  return <>{children}</>;
};
