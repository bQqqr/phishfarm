import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { emailConfigAtom, targetsAtom } from 'app/global/app';
import { useReadEmailConfig, useReadTargets } from 'features/configuration';

interface Props {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  // Hooks
  const setEmailConfig = useSetRecoilState(emailConfigAtom);
  const setTargets = useSetRecoilState(targetsAtom);
  const { fetchTargets } = useReadTargets();
  const { fetchConfig } = useReadEmailConfig();

  // Functions
  const handleSetup = useCallback(async () => {
    const { data: emailConfig } = await fetchConfig();
    const { data: targets } = await fetchTargets();

    setEmailConfig(emailConfig);
    setTargets(targets);
  }, [fetchConfig, fetchTargets, setEmailConfig, setTargets]);

  // Boostrap
  useEffect(() => {
    handleSetup();
  }, [handleSetup]);

  return <>{children}</>;
};
