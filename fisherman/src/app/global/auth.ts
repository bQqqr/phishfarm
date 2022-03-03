import { atom } from 'recoil';

export const apiAtom = atom<string>({
  key: 'apiAtom',
  default: '',
});

export const jwtAtom = atom<string>({
  key: 'jwtAtom',
  default: '',
});

export const isAuthAtom = atom<boolean>({
  key: 'isAuthAtom',
  default: false,
});
