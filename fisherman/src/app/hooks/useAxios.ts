import { useToast } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { apiAtom, isAuthAtom, jwtAtom } from 'app/global';
import {
  CreateTargetRequest,
  CreateTargetResponse,
  DeleteTargetRequest,
  Target,
} from 'features/target';
import { CampaignSettings, LaunchCampaignRequest } from 'features/campaign';
import { GetTokenRequest, GetTokenResponse } from 'features/auth';
import {
  TemplateSettings,
  UpdateTemplateSettingsRequest,
} from 'features/template';
import {
  EmailSettings,
  TestEmailRequest,
  UpdateEmailSettingsRequest,
} from 'features/email';

export const useAxios = () => {
  // Hooks
  const toast = useToast();
  const [api, setApi] = useRecoilState(apiAtom);
  const [jwt, setJwt] = useRecoilState(jwtAtom);
  const setIsAuth = useSetRecoilState(isAuthAtom);

  // Axios
  axios.defaults.baseURL = 'https://' + api + '/api';
  axios.interceptors.response.use(
    (res) => res,
    (err: AxiosError) => {
      // If user has not logged in.
      if (jwt === '') {
        console.log(1);
        if (err?.message === 'Network Error')
          toast({
            status: 'error',
            title: 'This farm does not exist.',
          });

        if (err.response?.status === 401)
          toast({
            status: 'error',
            title: 'The password you have entered is incorrect.',
          });
      }
      // if user has logged in.
      else {
        if (err?.message === 'Network Error')
          toast({
            status: 'error',
            title: 'Please check you internet connection.',
          });
        agent.logout();

        switch (err.response?.status) {
          case 500:
            toast({
              status: 'error',
              title: 'Please raise an issue on github.',
            });
            break;
          case 404:
            toast({
              status: 'error',
              title: 'It was not found.',
            });
            break;
          case 400:
            console.log(err.response?.data?.detail);
            break;
        }
      }

      Promise.reject(err);
    },
  );
  axios.interceptors.request.use((conf) => {
    const localstorageJwt = localStorage.getItem('farm.jwt');

    if (conf.headers !== undefined)
      conf.headers.Authorization = `Bearer ${localstorageJwt}`;

    return conf;
  });

  const requests = {
    get: <T>(url: string) => axios.get<T>(url),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body),
    del: <T>(url: string) => axios.delete<T>(url),
    post_form: <T>(url: string, data: {}) =>
      axios.post<T>(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    put_form: <T>(url: string, data: {}) =>
      axios.put<T>(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    download_file: (url: string, filename: string) =>
      axios({
        url: url, //your url
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      }),
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
    getEmailSettings: () => axios.get<EmailSettings>('/email-settings'),
    getTargets: () => axios.get<Target[]>('/targets'),
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

  return agent;
};
