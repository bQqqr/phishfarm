namespace Farm.Models;

public class EmailConfig
{
    public Template Template { get; set; } = new Template();
    public bool IsConfigured { get; set; } = false;
    public bool EnabledSsl { get; set; } = false;
    public string SmtpHost { get; set; } = "localhost";
    public int SmtpPort { get; set; } = 1025;
    public string SmtpUsername { get; set; } = "example_username";
    public string SmtpPassword { get; set; } = "example_password";
    public string FromEmail { get; set; } = "from@example.com";
    public string FromName { get; set; } = "Example Example";
    public string Subject { get; set; } = "Example Subject";
}