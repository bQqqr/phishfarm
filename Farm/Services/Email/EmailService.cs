using System.Net;
using System.Net.Mail;
using System.Text;

namespace Farm.Services.Email;

public class EmailService : IEmailService
{
    public bool IsConfigured { get; set; } = false;
    public bool EnabledSsl { get; set; } = false;
    public string SmtpHost { get; set; } = String.Empty;
    public int SmtpPort { get; set; } = 587;
    public string SmtpUsername { get; set; } = String.Empty;
    public string SmtpPassword { get; set; } = String.Empty;
    public string FromEmail { get; set; } = String.Empty;
    public string FromName { get; set; } = String.Empty;
    public string Subject { get; set; } = String.Empty;

    public void Configure(
        bool enabledSsl,
        string smtpHost,
        int smtpPort,
        string smtpUsername,
        string smtpPassword,
        string fromEmail,
        string fromName,
        string subject)
    {
        EnabledSsl = enabledSsl;
        SmtpHost = smtpHost;
        SmtpPort = smtpPort;
        SmtpUsername = smtpUsername;
        SmtpPassword = smtpPassword;
        FromEmail = fromEmail;
        FromName = fromName;
        Subject = subject;

        IsConfigured = true;
    }

    public void TestEmail(
        bool enabledSsl,
        string smtpHost,
        int smtpPort,
        string smtpUsername,
        string smtpPassword,
        string fromEmail,
        string fromName,
        string subject,
        string recipientEmail,
        string emailBody)
    {
        try
        {
            var sc = new SmtpClient(smtpHost, smtpPort);
            sc.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
            sc.DeliveryMethod = SmtpDeliveryMethod.Network;
            sc.EnableSsl = enabledSsl;

            var m = new MailMessage();
            m.From = new MailAddress(fromEmail, fromName);
            m.To.Add(new MailAddress(recipientEmail));
            m.Subject = subject;
            m.SubjectEncoding = Encoding.UTF8;
            m.Body = emailBody;
            m.BodyEncoding = Encoding.UTF8;
            m.IsBodyHtml = true;

            sc.Send(m);
        }
        catch (Exception ex)
        {
            throw new Exception($"EmailService Exception: {ex.Message}");
        }
    }

    public void SendEmail(string recipientEmail, string emailBody)
    {
        try
        {
            var sc = new SmtpClient(SmtpHost, SmtpPort);
            sc.Credentials = new NetworkCredential(SmtpUsername, SmtpPassword);
            sc.DeliveryMethod = SmtpDeliveryMethod.Network;
            sc.EnableSsl = EnabledSsl;

            var m = new MailMessage();
            m.From = new MailAddress(FromEmail, FromName);
            m.To.Add(new MailAddress(recipientEmail));
            m.Subject = Subject;
            m.SubjectEncoding = Encoding.UTF8;
            m.Body = emailBody;
            m.BodyEncoding = Encoding.UTF8;
            m.IsBodyHtml = true;

            sc.Send(m);
        }
        catch (Exception ex)
        {
            throw new Exception($"EmailService Exception: {ex.Message}");
        }
    }
}