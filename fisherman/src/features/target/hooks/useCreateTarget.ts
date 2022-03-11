import { useToast } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { targetsAtom } from 'app/global';
import { useAxios } from 'app/hooks';
import { CreateTargetRequest, Target } from 'features/target';

export const useCreateTarget = () => {
  // Hooks
  const { createTarget } = useAxios();
  const toast = useToast();
  const setTargets = useSetRecoilState(targetsAtom);

  // Functions
  const command = async (req: CreateTargetRequest) => {
    const resp = await createTarget(req);

    if (resp.status === 200) {
      setTargets((oldTargets) => {
        const target: Target = {
          id: resp.data!.id,
          firstName: req.firstName,
          lastName: req.lastName,
          emailAddress: req.emailAddress,
          maldoc: {
            content: req.maldocContent,
            filename: req.maldocFilename,
          },
        };

        return oldTargets ? [...oldTargets, target] : [target];
      });

      toast({
        title: 'Target was added successfully.',
        status: 'success',
        isClosable: true,
        duration: 2000,
      });
    }
  };

  // Returns
  return command;
};
