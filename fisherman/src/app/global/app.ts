import { IEmailConfig, ITarget } from 'app/interfaces';
import { atom } from 'recoil';

export const emailConfigAtom = atom<IEmailConfig | null>({
  key: 'emailConfigAtom',
  default: null,
});

export const targetsAtom = atom<ITarget[] | null>({
  key: 'targetsAtom',
  default: null,
});
