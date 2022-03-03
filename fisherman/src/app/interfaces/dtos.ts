import { ITemplate } from './domains';

export interface AddTargetRequest {
  firstName: string;
  lastName: string;
  emailAddress: string;
  maldocContent: string;
  maldocFilename: string;
}

export interface IAddTargetResponse {
  id: string;
}

export interface IAuthenticateRequest {
  password: string;
}

export interface IAuthenticateResponse {
  token: string;
}

export interface IChangeEmailConfigRequest {
  enabledSsl: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  subject: string;
}

export interface IChangeTemplateConfigRequest {
  design: string;
  html: string;
}

export interface IRemoveTargetRequest {
  targetId: string;
}

export interface ISendTestEmailRequest {
  recipientEmail: string;
}
