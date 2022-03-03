import { useToast } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import {
  IAddTargetResponse,
  IAuthenticateRequest,
  IAuthenticateResponse,
  IChangeEmailConfigRequest,
  IChangeTemplateConfigRequest,
  IRemoveTargetRequest,
} from 'app/interfaces';
import { apiAtom, jwtAtom } from 'app/global';
import {
  IAddTargetRequest,
  IEmailConfig,
  ITarget,
  ITemplate,
} from 'features/config';

export const useAgent = () => {
  const [api] = useRecoilState(apiAtom);
  const [jwt] = useRecoilState(jwtAtom);
  const toast = useToast();
  const baseUrl = `https://${api}/api`;

  type Result<T> = {
    state: 'Fail' | 'Success';
    statusCode: number;
    data: T;
  };

  const requests = {
    get: <T>(resource: string) =>
      fetch(baseUrl + resource, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      })
        .then(async (response) => {
          const statusCode = response.status;
          const data = await response.json();

          return {
            state: 'Success',
            statusCode: statusCode,
            data: data,
          } as Result<T>;
        })
        .catch((ex) => {
          toast({
            title: ex.message,
            status: 'error',
            isClosable: true,
            duration: 2000,
          });

          return {
            state: 'Fail',
            statusCode: 0,
            data: {},
          } as Result<T>;
        }),
    post: <T>(resource: string, body: {}) =>
      fetch(baseUrl + resource, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${jwt}`,
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(body),
      })
        .then(async (response) => {
          const statusCode = response.status;
          const body = await response.json();
          return {
            state: 'Success',
            statusCode: statusCode,
            data: body,
          } as Result<T>;
        })
        .catch((ex) => {
          toast({
            title: ex.message,
            status: 'error',
            isClosable: true,
            duration: 2000,
          });

          return {
            state: 'Fail',
            statusCode: 0,
            data: {},
          } as Result<T>;
        }),
    put: <T>(resource: string, body: {}) =>
      fetch(baseUrl + resource, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${jwt}`,
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(body),
      })
        .then(async (response) => {
          const statusCode = response.status;
          const data = await response.json();

          return {
            state: 'Success',
            statusCode: statusCode,
            data: data,
          } as Result<T>;
        })
        .catch((ex) => {
          toast({
            title: ex.message,
            status: 'error',
            isClosable: true,
            duration: 2000,
          });

          return {
            state: 'Fail',
            statusCode: 0,
            data: {},
          } as Result<T>;
        }),
    del: <T>(resource: string) =>
      fetch(baseUrl + resource, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      })
        .then(async (response) => {
          const statusCode = response.status;
          const data = await response.json();

          return {
            state: 'Success',
            statusCode: statusCode,
            data: data,
          } as Result<T>;
        })
        .catch((ex) => {
          toast({
            title: ex.message,
            status: 'error',
            isClosable: true,
            duration: 2000,
          });

          return {
            state: 'Fail',
            statusCode: 0,
            data: {},
          } as Result<T>;
        }),
  };

  const agent = {
    testEmail: (req: IAddTargetRequest) =>
      requests.post<void>('/actions/test-email', req),
    authenticate: (req: IAuthenticateRequest) =>
      requests.post<IAuthenticateResponse>('/auth', req),
    addTarget: (req: IAddTargetRequest) =>
      requests.post<IAddTargetResponse>('/campaign/targets', req),
    readTargets: () => requests.get<ITarget[]>('/campaign/targets'),
    delTarget: (req: IRemoveTargetRequest) =>
      requests.del(`/campaign/targets/${req.targetId}`),
    changeEmailConf: (req: IChangeEmailConfigRequest) =>
      requests.post('/api/email-config', req),
    readEmailConf: () => requests.get<IEmailConfig>('/api/email-config'),
    changeTemplate: (req: IChangeTemplateConfigRequest) =>
      requests.post('/api/template', req),
    readTemplate: () => requests.get<ITemplate>('/api/template'),
  };

  return { agent };
};
