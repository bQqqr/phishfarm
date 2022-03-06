export interface UpdateTemplateSettingsRequest {
  design: string;
  html: string;
}

export interface TemplateSettings {
  isConfigured: boolean;
  design: string;
  html: string;
}
