import { useToast } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { targetsAtom } from 'app/global';
import { useAxios } from 'app/hooks';
import { DeleteTargetRequest } from 'features/target';

export const useDeleteTarget = () => {
  // Hooks
  const { deleteTarget } = useAxios();
  const toast = useToast();
  const setTargets = useSetRecoilState(targetsAtom);

  // Definitions
  const command = async (req: DeleteTargetRequest) => {
    const resp = await deleteTarget(req);

    if (resp.status === 204) {
      setTargets((oldTargets) => {
        if (oldTargets)
          return oldTargets.filter((t) => {
            return t.id !== req.targetId;
          });
        else return [];
      });
      toast({
        title: 'Target was removed successfully.',
        status: 'success',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  // Returns
  return command;
};
