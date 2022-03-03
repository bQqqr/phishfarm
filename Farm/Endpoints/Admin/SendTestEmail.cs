using Farm.Services.Email;
using FastEndpoints;
using FastEndpoints.Validation;

namespace Farm.Endpoints.Admin;

#region Request
public class SendTestEmailRequest
{
    public string RecipientEmail { get; set; } = String.Empty;
}
#endregion

#region Validator
public class SendTestEmailRequestValidator : Validator<SendTestEmailRequest>
{
    public SendTestEmailRequestValidator()
    {
        RuleFor(r => r.RecipientEmail).NotEmpty().EmailAddress();
    }
}
#endregion

#region Endpoint
public class SendTestEmailEndpoint : Endpoint<SendTestEmailRequest>
{
    private readonly IEmailService _emailService;

    public SendTestEmailEndpoint(IEmailService emailService)
    {
        _emailService = emailService;
    }

    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/actions/test-email");
        Roles("Admin");
        Describe(e => e
            .Accepts<SendTestEmailRequest>("application/json")
            .Produces(200)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override async Task HandleAsync(SendTestEmailRequest req, CancellationToken ct)
    {
        _emailService.SendEmail(req.RecipientEmail);

        await SendOkAsync();
    }
}
#endregion