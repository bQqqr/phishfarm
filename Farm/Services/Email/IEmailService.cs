using Farm.Models;

namespace Farm.Services.Email;

public interface IEmailService
{
    EmailConfig Config { get; set; }

    void SendEmail(string recipientEmail);
}