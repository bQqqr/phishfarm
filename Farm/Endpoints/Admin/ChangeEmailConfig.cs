using Farm.Common.Validators;
using Farm.Services.Email;
using FastEndpoints;
using FastEndpoints.Validation;

namespace Farm.Endpoints.Admin;

#region Request
public class ChangeEmailConfigRequest
{
    public bool EnabledSsl { get; set; } = false;
    public string SmtpHost { get; set; } = String.Empty;
    public int SmtpPort { get; set; } = 587;
    public string SmtpUsername { get; set; } = String.Empty;
    public string SmtpPassword { get; set; } = String.Empty;
    public string FromEmail { get; set; } = String.Empty;
    public string FromName { get; set; } = String.Empty;
    public string Subject { get; set; } = String.Empty;
}
#endregion

#region Validator
public class ChangeEmailConfigValidator : Validator<ChangeEmailConfigRequest>
{
    public ChangeEmailConfigValidator()
    {
        RuleFor(r => r.SmtpHost).NotEmpty().MaximumLength(253).HostnameOrIpAddress();
        RuleFor(r => r.SmtpPort).InclusiveBetween(0, 65535);
        RuleFor(r => r.SmtpUsername).NotEmpty().MaximumLength(64);
        RuleFor(r => r.SmtpPassword).NotEmpty().MaximumLength(64);
        RuleFor(r => r.FromEmail).NotEmpty().MaximumLength(254).EmailAddress();
        RuleFor(r => r.FromName).NotEmpty().MaximumLength(78);
        RuleFor(r => r.Subject).NotEmpty().MaximumLength(998);
    }
}
#endregion

#region Endpoint
public class ChangeEmailConfigEndpoint : Endpoint<ChangeEmailConfigRequest>
{
    private readonly IEmailService _emailService;

    public ChangeEmailConfigEndpoint(IEmailService emailService)
    {
        _emailService = emailService;
    }

    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/email-config");
        Roles("Admin");
        Describe(e => e
            .Accepts<ChangeEmailConfigRequest>("application/json")
            .Produces(200)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override async Task HandleAsync(ChangeEmailConfigRequest req, CancellationToken ct)
    {
        _emailService.Config.EnabledSsl = req.EnabledSsl;
        _emailService.Config.SmtpHost = req.SmtpHost;
        _emailService.Config.SmtpPort = req.SmtpPort;
        _emailService.Config.SmtpUsername = req.SmtpUsername;
        _emailService.Config.SmtpPassword = req.SmtpPassword;
        _emailService.Config.FromEmail = req.FromEmail;
        _emailService.Config.FromName = req.FromName;
        _emailService.Config.Subject = req.Subject;
        _emailService.Config.IsConfigured = true;

        await SendOkAsync();
    }
}
#endregion