using Farm.Common.Exceptions;
using Farm.Services.Email;
using FastEndpoints;
using FastEndpoints.Validation;

namespace Farm.Endpoints.Admin;

public class TestEmailRequest
{
    public string? Recipient { get; set; }
    public string? EmailBody { get; set; }
}

public class TestEmailRequestValidator : Validator<TestEmailRequest>
{
    public TestEmailRequestValidator()
    {
        RuleFor(r => r.Recipient).NotNull().NotEmpty().MaximumLength(254);
        RuleFor(r => r.EmailBody).NotNull().NotEmpty().MaximumLength(384000);
    }
}

public class TestEmailEndpoint : Endpoint<TestEmailRequest>
{
    private readonly IEmailService _emailService;

    public TestEmailEndpoint(IEmailService emailService)
    {
        _emailService = emailService;
    }

    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/operator/test-email");
        Roles("Admin");
    }

    public override Task HandleAsync(TestEmailRequest req, CancellationToken ct)
    {
        if (!_emailService.IsConfigured())
            throw new BadRequestException("First, you must configure the email settings.");

        _emailService.SendEmail(req.Recipient!, req.EmailBody!);

        return Task.CompletedTask;
    }
}