using System.Net;
using System.Net.Mail;
using System.Text;
using Farm.Models;

namespace Farm.Services.Email;

public class EmailService : IEmailService
{
    public EmailConfig Config { get; set; } = new EmailConfig();

    public void SendEmail(string recipientEmail)
    {
        try
        {
            var sc = new SmtpClient(Config.SmtpHost, Config.SmtpPort);
            sc.Credentials = new NetworkCredential(Config.SmtpUsername, Config.SmtpPassword);
            sc.DeliveryMethod = SmtpDeliveryMethod.Network;
            sc.EnableSsl = Config.EnabledSsl;

            var m = new MailMessage();
            m.Subject = Config.Subject;
            m.From = new MailAddress(Config.FromEmail, Config.FromName);
            m.To.Add(new MailAddress(recipientEmail));
            m.SubjectEncoding = Encoding.UTF8;
            m.Body = Config.Template.Html;
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