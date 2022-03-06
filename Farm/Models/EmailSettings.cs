namespace Farm.Models;

public class EmailSettings
{
    public bool IsConfigured { get; set; } = false;
    public bool IsTested { get; set; } = false;
    public string SmtpHost { get; set; } = "localhost";
    public int SmtpPort { get; set; } = 1025;
    public bool EnabledSsl { get; set; } = false;
    public string SmtpUsername { get; set; } = "example_username";
    public string SmtpPassword { get; set; } = "example_password";
    public string FromEmail { get; set; } = "from@example.com";
    public string FromName { get; set; } = "Example Example";
    public string Subject { get; set; } = "Example Subject";
}