using Farm.Models;
using Farm.Services.Email;
using FastEndpoints;

namespace Farm.Endpoints.Admin;

public class GetEmailSettingsEndpoint : EndpointWithoutRequest<EmailSettings>
{
    private readonly IEmailService _emailService;

    public GetEmailSettingsEndpoint(IEmailService emailService)
    {
        _emailService = emailService;
    }

    public override void Configure()
    {
        Verbs(Http.GET);
        Routes("/api/email-settings");
        Roles("Admin");
        Describe(e => e
            .Produces<EmailSettings>(200)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override Task HandleAsync(CancellationToken ct)
    {
        Response.IsConfigured = _emailService.Settings.IsConfigured;
        Response.EnabledSsl = _emailService.Settings.EnabledSsl;
        Response.SmtpHost = _emailService.Settings.SmtpHost;
        Response.SmtpPort = _emailService.Settings.SmtpPort;
        Response.SmtpUsername = _emailService.Settings.SmtpUsername;
        Response.SmtpPassword = _emailService.Settings.SmtpPassword;
        Response.FromEmail = _emailService.Settings.FromEmail;
        Response.FromName = _emailService.Settings.FromName;
        Response.Subject = _emailService.Settings.Subject;

        return Task.CompletedTask;
    }
}

