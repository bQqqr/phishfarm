export interface IEmailConfig {
  template: ITemplate;
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

export interface IMaldoc {
  filename: string;
  content: string;
}

export interface ITarget {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  maldoc: IMaldoc;
}

export interface ITemplate {
  isConfigured: boolean;
  design: string;
  html: string;
}
