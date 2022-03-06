import { atom } from 'recoil';
import { EmailSettings } from 'features/email';
import { TemplateSettings } from 'features/template';
import { Target } from 'features/target';
import { CampaignSettings } from 'features/campaign';

export const emailSettingsAtom = atom<EmailSettings | null>({
  key: 'emailSettingsAtom',
  default: null,
});

export const templateSettingsAtom = atom<TemplateSettings | null>({
  key: 'templateSettingsAtom',
  default: null,
});

export const campaignSettingsAtom = atom<CampaignSettings | null>({
  key: 'campaignSettingsAtom',
  default: null,
});

export const targetsAtom = atom<Target[]>({
  key: 'targetsAtom',
  default: [],
});
