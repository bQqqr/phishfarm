import { atom } from 'recoil';

export const tabsIndexAtom = atom<number>({
  key: 'tabsIndexAtom',
  default: 0,
});
