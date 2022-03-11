import { useCallback, useEffect, useState } from 'react';
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
import { Spinner } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  // Hooks
  const [done, setDone] = useState(false);
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

    if (templateDto) setTemplateSettings(templateDto);
    if (emailDto) setEmailSettings(emailDto);
    if (targetsDto) setTargets(targetsDto ?? []);
    if (campaignDto) setCampaignSettings(campaignDto);

    setDone(true);
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

  if (done) return <>{children}</>;
  else return <Spinner />;
};
