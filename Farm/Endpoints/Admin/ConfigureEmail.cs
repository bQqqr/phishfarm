using Farm.Common.Validators;
using Farm.Services.Email;
using FastEndpoints;
using FastEndpoints.Validation;

namespace Farm.Endpoints.Admin;

public class ConfigureEmailRequest
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

public class ConfigureEmailRequestValidator : Validator<ConfigureEmailRequest>
{
    public ConfigureEmailRequestValidator()
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

public class ConfigureEmailEndpoint : Endpoint<ConfigureEmailRequest>
{
    private readonly IEmailService _emailService;

    public ConfigureEmailEndpoint(IEmailService emailService)
    {
        _emailService = emailService;
    }

    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/operator/configure-email");
        Roles("Admin");
    }

    public override Task HandleAsync(ConfigureEmailRequest req, CancellationToken ct)
    {
        _emailService.Configure(
            req.EnabledSsl,
            req.SmtpHost,
            req.SmtpPort,
            req.SmtpUsername,
            req.SmtpPassword,
            req.FromEmail,
            req.FromName,
            req.Subject
        );

        return Task.CompletedTask;
    }
}