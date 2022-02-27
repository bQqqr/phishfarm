using System.Net;
using System.Net.Mail;
using System.Text;

namespace Farm.Services.Email;

public class EmailService : IEmailService
{
    private bool _isConfigured = false;
    private bool _enabledSsl;
    private string? _smtpHost = String.Empty;
    private int _smtpPort;
    private string? _smtpUsername = String.Empty;
    private string? _smtpPassword = String.Empty;
    private string? _fromEmail = String.Empty;
    private string? _fromName = String.Empty;
    private string? _subject = String.Empty;

    public void Configure(
        bool enabledSsl,
        string? smtpHost,
        int smtpPort,
        string? smtpUsername,
        string? smtpPassword,
        string? fromEmail,
        string? fromName,
        string? subject)
    {
        _enabledSsl = enabledSsl;
        _smtpHost = smtpHost;
        _smtpPort = smtpPort;
        _smtpUsername = smtpUsername;
        _smtpPassword = smtpPassword;
        _fromEmail = fromEmail;
        _fromName = fromName;
        _subject = subject;

        _isConfigured = true;
    }

    public bool IsConfigured() => _isConfigured;

    public void SendEmail(string recipientEmail, string emailBody)
    {
        try
        {
            var sc = new SmtpClient(_smtpHost, _smtpPort);
            sc.Credentials = new NetworkCredential(_smtpUsername, _smtpPassword);
            sc.DeliveryMethod = SmtpDeliveryMethod.Network;
            sc.EnableSsl = _enabledSsl;

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