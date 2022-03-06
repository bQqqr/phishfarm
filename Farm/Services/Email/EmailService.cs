using System.Net;
using System.Net.Mail;
using System.Text;
using Farm.Models;

namespace Farm.Services.Email;

public class EmailService : IEmailService
{
    public EmailSettings Settings { get; set; } = new EmailSettings();

    public void SendEmail(string recipientEmail, string htmlMessage)
    {
        try
        {
            var sc = new SmtpClient(Settings.SmtpHost, Settings.SmtpPort);
            sc.Credentials = new NetworkCredential(Settings.SmtpUsername, Settings.SmtpPassword);
            sc.DeliveryMethod = SmtpDeliveryMethod.Network;
            sc.EnableSsl = Settings.EnabledSsl;

            var m = new MailMessage();
            m.Subject = Settings.Subject;
            m.From = new MailAddress(Settings.FromEmail, Settings.FromName);
            m.To.Add(new MailAddress(recipientEmail));
            m.SubjectEncoding = Encoding.UTF8;
            m.Body = htmlMessage;
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