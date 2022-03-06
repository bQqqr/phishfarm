using Farm.Services.Email;
using Farm.Services.Template;
using FastEndpoints;
using FastEndpoints.Validation;

namespace Farm.Endpoints.Admin;

public class TestEmailRequest
{
    public string RecipientEmail { get; set; } = String.Empty;
}

public class TestEmailRequestValidator : Validator<TestEmailRequest>
{
    public TestEmailRequestValidator()
    {
        RuleFor(r => r.RecipientEmail).NotEmpty().EmailAddress();
    }
}

public class TestEmailRequestEndpoint : Endpoint<TestEmailRequest>
{
    private readonly IEmailService _emailService;
    private readonly ITemplateService _templateService;

    public TestEmailRequestEndpoint(IEmailService emailService,
        ITemplateService templateService)
    {
        _emailService = emailService;
        _templateService = templateService;
    }

    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/actions/test-email");
        Roles("Admin");
        Describe(e => e
            .Accepts<TestEmailRequest>("application/json")
            .Produces(204)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override async Task HandleAsync(TestEmailRequest req, CancellationToken ct)
    {
        var message = _templateService.Settings.Html;

        _emailService.Settings.IsTested = true;

        _emailService.SendEmail(req.RecipientEmail, message);

        await SendNoContentAsync();
    }
}