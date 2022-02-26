namespace Farm.Services.Email;

public interface IEmailService
{
    void Configure(
        string? smtpHost,
        int smtpPort,
        string? smtpUsername,
        string? smtpPassword,
        string? fromEmail,
        string? fromName,
        string? subject);
    void SendEmail(string recipientEmail, string emailBody);
}