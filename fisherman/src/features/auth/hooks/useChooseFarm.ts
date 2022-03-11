import { useSetRecoilState } from 'recoil';
import { apiAtom } from 'app/global';

export const useChooseFarm = () => {
  // Hooks
  const setApi = useSetRecoilState(apiAtom);

  // Functions
  async function chooseFarm(api: string) {
    localStorage.setItem('farm.api', api);
    setApi(api);
  }

  // Returns
  return { chooseFarm };
};
