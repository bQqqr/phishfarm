import { useToast } from '@chakra-ui/react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { apiAtom, isAuthAtom, jwtAtom } from 'app/global';
import { GetTokenRequest, GetTokenResponse } from 'features/auth';
import {
  EmailSettings,
  TestEmailRequest,
  UpdateEmailSettingsRequest,
} from 'features/email';
import {
  TemplateSettings,
  UpdateTemplateSettingsRequest,
} from 'features/template';
import {
  CreateTargetRequest,
  CreateTargetResponse,
  DeleteTargetRequest,
  Target,
} from 'features/target';
import { CampaignSettings, LaunchCampaignRequest } from 'features/campaign';

export const useAgent = () => {
  const toast = useToast();
  const [api, setApi] = useRecoilState(apiAtom);
  const [jwt, setJwt] = useRecoilState(jwtAtom);
  const setIsAuth = useSetRecoilState(isAuthAtom);
  const baseUrl = `https://${api}/api`;

  type Result<T> = {
    status: number;
    data: T | null;
  };

  const handleResponse = async <T>(response: Response) => {
    const statusCode = response.status;

    console.log(statusCode);

    var result = {
      status: statusCode,
      data: null,
    } as Result<T>;

    switch (statusCode) {
      case 204:
        return result;
      case 200:
        result.data = (await response.json()) as T;
        return result;
      case 400:
        toast({
          status: 'error',
          title: 'Validation Erros',
          description: `${JSON.stringify(await response.json())}`,
          isClosable: true,
          duration: 2000,
        });
        return result;
      default:
        return result;
    }
  };

  const handleException = async <T>(exception: any) => {
    toast({
      title: 'Exception',
      description: exception?.message,
      status: 'error',
      isClosable: true,
      duration: 2000,
    });

    return {
      status: 0,
      data: null,
    } as Result<T>;
  };

  const requests = {
    get: <T>(resource: string) =>
      fetch(baseUrl + resource, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      })
        .then((resp) => handleResponse<T>(resp))
        .catch((ex) => handleException<T>(ex)),
    post: <T>(resource: string, body: {}) =>
      fetch(baseUrl + resource, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${jwt}`,
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(body),
      })
        .then((resp) => handleResponse<T>(resp))
        .catch((ex) => handleException<T>(ex)),
    put: <T>(resource: string, body: {}) =>
      fetch(baseUrl + resource, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${jwt}`,
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(body),
      })
        .then((resp) => handleResponse<T>(resp))
        .catch((ex) => handleException<T>(ex)),
    del: <T>(resource: string) =>
      fetch(baseUrl + resource, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      })
        .then((resp) => handleResponse<T>(resp))
        .catch((ex) => handleException<T>(ex)),
  };

  const agent = {
    logout: () => {
      localStorage.clear();
      setApi('');
      setJwt('');
      setIsAuth(false);
    },
    createTarget: (req: CreateTargetRequest) =>
      requests.post<CreateTargetResponse>('/targets', req),
    deleteTarget: (req: DeleteTargetRequest) =>
      requests.del(`/targets/${req.targetId}`),
    getCampaignSettings: () =>
      requests.get<CampaignSettings>('/campaign-settings'),
    getEmailSettings: () => requests.get<EmailSettings>('/email-settings'),
    getTargets: () => requests.get<Target[]>('/targets'),
    getTemplateSettings: () =>
      requests.get<TemplateSettings>('/template-settings'),
    getToken: (req: GetTokenRequest) =>
      requests.post<GetTokenResponse>('/token', req),
    launchCampaign: (req: LaunchCampaignRequest) =>
      requests.post('/actions/launch-campaign', req),
    testEmail: (req: TestEmailRequest) =>
      requests.post('/actions/test-email', req),
    updateEmailSettings: (req: UpdateEmailSettingsRequest) =>
      requests.post('/email-settings', req),
    updateTemplateSettings: (req: UpdateTemplateSettingsRequest) =>
      requests.post('/template-settings', req),
  };

  return { agent };
};
