using Farm.Models;
using Farm.Services.Email;
using FastEndpoints;

namespace Farm.Endpoints.Admin;

#region Endpoint
public class ReadEmailConfigEndpoint : EndpointWithoutRequest<EmailConfig>
{
    private readonly IEmailService _emailService;

    public ReadEmailConfigEndpoint(IEmailService emailService)
    {
        _emailService = emailService;
    }

    public override void Configure()
    {
        Verbs(Http.GET);
        Routes("/api/email-config");
        Roles("Admin");
        Describe(e => e
            .Produces<EmailConfig>(200)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override Task HandleAsync(CancellationToken ct)
    {
        Response.IsConfigured = _emailService.Config.IsConfigured;
        Response.EnabledSsl = _emailService.Config.EnabledSsl;
        Response.SmtpHost = _emailService.Config.SmtpHost;
        Response.SmtpPort = _emailService.Config.SmtpPort;
        Response.SmtpUsername = _emailService.Config.SmtpUsername;
        Response.SmtpPassword = _emailService.Config.SmtpPassword;
        Response.FromEmail = _emailService.Config.FromEmail;
        Response.FromName = _emailService.Config.FromName;
        Response.Subject = _emailService.Config.Subject;
        Response.Template = _emailService.Config.Template;

        return Task.CompletedTask;
    }
}
#endregion

