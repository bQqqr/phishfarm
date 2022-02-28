using Farm.Services.Email;
using FastEndpoints;

namespace Farm.Endpoints.Admin;

public class ReadEmailConfigurationResponse
{
    public bool IsConfigured { get; set; }
    public bool EnabledSsl { get; set; }
    public string SmtpHost { get; set; } = String.Empty;
    public int SmtpPort { get; set; } = 587;
    public string SmtpUsername { get; set; } = String.Empty;
    public string SmtpPassword { get; set; } = String.Empty;
    public string FromEmail { get; set; } = String.Empty;
    public string FromName { get; set; } = String.Empty;
    public string Subject { get; set; } = String.Empty;
}

public class ReadEmailConfigurationEndpoint : EndpointWithoutRequest<ReadEmailConfigurationResponse>
{
    private readonly IEmailService _emailService;

    public ReadEmailConfigurationEndpoint(IEmailService emailService)
    {
        _emailService = emailService;
    }

    public override void Configure()
    {
        Verbs(Http.GET);
        Routes("/api/operator/read-email-config");
        Roles("Admin");
    }

    public override Task HandleAsync(CancellationToken ct)
    {
        Response.IsConfigured = _emailService.IsConfigured;
        Response.EnabledSsl = _emailService.EnabledSsl;
        Response.SmtpHost = _emailService.SmtpHost;
        Response.SmtpPort = _emailService.SmtpPort;
        Response.SmtpUsername = _emailService.SmtpUsername;
        Response.SmtpPassword = _emailService.SmtpPassword;
        Response.FromEmail = _emailService.FromEmail;
        Response.FromName = _emailService.FromName;
        Response.Subject = _emailService.Subject;

        return Task.CompletedTask;
    }
}