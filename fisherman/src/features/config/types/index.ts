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
