import { useToast } from '@chakra-ui/react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  IAddTargetRequest,
  IAddTargetResponse,
  IAuthenticateRequest,
  IAuthenticateResponse,
  IChangeEmailConfigRequest,
  IChangeTemplateConfigRequest,
  IEmailConfig,
  IRemoveTargetRequest,
  ISendTestEmailRequest,
  ITarget,
  ITemplate,
} from 'app/interfaces';
import { apiAtom, isAuthAtom, jwtAtom } from 'app/global';

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
      case 401:
        agent.logout();
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
      window.location.reload();
    },
    testEmail: (req: ISendTestEmailRequest) =>
      requests.post<void>('/actions/test-email', req),
    authenticate: (req: IAuthenticateRequest) =>
      requests.post<IAuthenticateResponse>('/auth', req),
    addTarget: (req: IAddTargetRequest) =>
      requests.post<IAddTargetResponse>('/campaign/targets', req),
    readTargets: () => requests.get<ITarget[]>('/campaign/targets'),
    delTarget: (req: IRemoveTargetRequest) =>
      requests.del(`/campaign/targets/${req.targetId}`),
    changeEmailConf: (req: IChangeEmailConfigRequest) =>
      requests.post('/email-config', req),
    readEmailConf: () => requests.get<IEmailConfig>('/email-config'),
    changeTemplate: (req: IChangeTemplateConfigRequest) =>
      requests.post('/template', req),
    readTemplate: () => requests.get<ITemplate>('/template'),
  };

  return { agent };
};
