export interface IEmailConfig {
  isConfigured: boolean;
  enabledSsl: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  subject: string;
}

export interface ITemplate {
  design: string;
  html: string;
}

export interface IConfigureEmailRequest {
  enabledSsl: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  subject: string;
}

export interface IConfigurateTemplate {
  design: string;
  html: string;
}

export interface IAddTargetRequest {
  firstName: string;
  lastName: string;
  emailAddress: string;
  maldocContent: any;
  maldocFilename: string;
}

export interface IMaldoc {
  filename: string;
  content: any;
}

export interface ITarget {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  maldoc: IMaldoc;
}
