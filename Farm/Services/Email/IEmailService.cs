namespace Farm.Services.Email;

public interface IEmailService
{
    bool IsConfigured { get; set; }
    bool EnabledSsl { get; set; }
    string SmtpHost { get; set; }
    int SmtpPort { get; set; }
    string SmtpUsername { get; set; }
    string SmtpPassword { get; set; }
    string FromEmail { get; set; }
    string FromName { get; set; }
    string Subject { get; set; }

    void Configure(
        bool enabledSsl,
        string smtpHost,
        int smtpPort,
        string smtpUsername,
        string smtpPassword,
        string fromEmail,
        string fromName,
        string subject);


    void TestEmail(
        bool enabledSsl,
        string smtpHost,
        int smtpPort,
        string smtpUsername,
        string smtpPassword,
        string fromEmail,
        string fromName,
        string subject,
        string recipientEmail,
        string emailBody);
    void SendEmail(string recipientEmail, string emailBody);
}