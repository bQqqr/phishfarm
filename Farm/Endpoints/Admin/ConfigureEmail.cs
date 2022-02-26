using Athena.Application.Common.Validators;
using Farm.Services.Email;
using FastEndpoints;
using FastEndpoints.Validation;

namespace Farm.Endpoints.Admin;

public class ConfigureEmailRequest
{
    public bool EnabledSsl { get; set; }
    public string? SmtpHost { get; set; }
    public int SmtpPort { get; set; }
    public string? SmtpUsername { get; set; }
    public string? SmtpPassword { get; set; }
    public string? FromEmail { get; set; }
    public string? FromName { get; set; }
    public string? Subject { get; set; }
}

public class ConfigureEmailRequestValidator : Validator<ConfigureEmailRequest>
{
    public ConfigureEmailRequestValidator()
    {
        RuleFor(r => r.SmtpHost).NotNull().NotEmpty().MaximumLength(253).HostnameOrIpAddress();
        RuleFor(r => r.SmtpPort).InclusiveBetween(0, 65535);
        RuleFor(r => r.SmtpUsername).NotNull().NotEmpty().MaximumLength(64);
        RuleFor(r => r.SmtpPassword).NotNull().NotEmpty().MaximumLength(64);
        RuleFor(r => r.FromEmail).NotNull().NotEmpty().MaximumLength(254).EmailAddress();
        RuleFor(r => r.FromName).NotNull().NotEmpty().MaximumLength(78);
        RuleFor(r => r.Subject).NotNull().NotEmpty().MaximumLength(998);
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
        Routes("/api/operator/actions/configure-email");
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



