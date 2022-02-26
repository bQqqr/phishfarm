using Farm.Services.Email;
using FastEndpoints;
using FastEndpoints.Validation;

namespace Farm.Api.Admin;

public class ConfigureEmailRequest
{
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
        RuleFor(r => r.SmtpHost).NotNull().NotEmpty().MaximumLength(253);
        RuleFor(r => r.SmtpPort).InclusiveBetween(0, 65535);
        RuleFor(r => r.SmtpUsername).NotNull().NotEmpty().MaximumLength(64);
        RuleFor(r => r.SmtpPassword).NotNull().NotEmpty().MaximumLength(64);
        RuleFor(r => r.FromEmail).NotNull().NotEmpty().MaximumLength(254);
        RuleFor(r => r.FromEmail).NotNull().NotEmpty().MaximumLength(254);
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
        Post("/api/email/settings");
        AllowAnonymous();
        Describe(b => b
          .Accepts<ConfigureEmailRequest>("application/json")
          .Produces(200)
          .ProducesProblem(400));

    }

    public override Task HandleAsync(ConfigureEmailRequest req, CancellationToken ct)
    {
        _emailService.Configure(
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



