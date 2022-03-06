using Farm.Models;

namespace Farm.Services.Email;

public interface IEmailService
{
    EmailSettings Settings { get; set; }

    void SendEmail(string recipientEmail, string htmlMessage);
}