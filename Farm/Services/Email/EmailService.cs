using System.Net;
using System.Net.Mail;
using System.Text;

namespace Farm.Services.Email;

public class EmailService : IEmailService
{
    /// <summary>
    /// It represents the domain name of the SMTP server.
    /// </summary>
    private string? _smtpHost = String.Empty;

    /// <summary>
    /// It represents the SMTP port number of the SMTP server.
    /// </summary>
    private int _smtpPort;

    /// <summary>
    /// It represents the username that is needed for authentication.
    /// </summary>
    private string? _smtpUsername = String.Empty;

    /// <summary>
    /// It represents the password that is needed for authentication.
    /// </summary>
    private string? _smtpPassword = String.Empty;

    /// <summary>
    /// It represents the sender's display email address.
    /// </summary>
    private string? _fromEmail = String.Empty;

    /// <summary>
    /// It represents the sender's display name.
    /// </summary>
    private string? _fromName = String.Empty;

    /// <summary>
    /// It represents the email message's subject.
    /// </summary>
    private string? _subject = String.Empty;

    /// <summary>
    /// Use this method to configure EmailService.
    /// </summary>
    public void Configure(
        string? smtpHost,
        int smtpPort,
        string? smtpUsername,
        string? smtpPassword,
        string? fromEmail,
        string? fromName,
        string? subject)
    {
        _smtpHost = smtpHost;
        _smtpPort = smtpPort;
        _smtpUsername = smtpUsername;
        _smtpPassword = smtpPassword;
        _fromEmail = fromEmail;
        _fromName = fromName;
        _subject = subject;
    }

    public void SendEmail(string recipientEmail, string emailBody)
    {
        try
        {
            var sc = new SmtpClient(_smtpHost, _smtpPort);
            sc.Credentials = new NetworkCredential(_smtpUsername, _smtpPassword);
            sc.DeliveryMethod = SmtpDeliveryMethod.Network;
            sc.EnableSsl = true;

            var m = new MailMessage();
            m.From = new MailAddress(_fromEmail!, _fromName);
            m.To.Add(new MailAddress(recipientEmail));
            m.Subject = _subject;
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