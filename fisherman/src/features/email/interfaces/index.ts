export interface UpdateEmailSettingsRequest {
  enabledSsl: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  subject: string;
}

export interface EmailSettings {
  isConfigured: boolean;
  isTested: boolean;
  smtpHost: string;
  smtpPort: number;
  enabledSsl: boolean;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  subject: string;
}

export interface TestEmailRequest {
  recipientEmail: string;
}
