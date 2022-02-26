namespace Farm.Services.Email;

public interface IEmailService
{

    void Configure(
        bool enabledSsl,
        string? smtpHost,
        int smtpPort,
        string? smtpUsername,
        string? smtpPassword,
        string? fromEmail,
        string? fromName,
        string? subject);
    bool IsConfigured();

    void SendEmail(string recipientEmail, string emailBody);
}