using Farm.Services.Email;
using FastEndpoints;
using FastEndpoints.Validation;

namespace Farm.Endpoints.Admin;

#region Request
public class ChangeTemplateConfigRequest
{
    public string Design { get; set; } = String.Empty;
    public string Html { get; set; } = String.Empty;
}
#endregion

#region Validator
public class ChangeTemplateConfigValidator : Validator<ChangeTemplateConfigRequest>
{
    public ChangeTemplateConfigValidator()
    {
        RuleFor(r => r.Design).NotEmpty();
        RuleFor(r => r.Html).NotEmpty();
    }
}
#endregion

#region Endpoint
public class ChangeTemplateConfigEndpoint : Endpoint<ChangeTemplateConfigRequest>
{
    private readonly IEmailService _emailService;

    public ChangeTemplateConfigEndpoint(IEmailService emailService)
    {
        _emailService = emailService;
    }

    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/template");
        Roles("Admin");
        Describe(e => e
            .Accepts<ChangeEmailConfigRequest>("application/json")
            .Produces(200)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override async Task HandleAsync(ChangeTemplateConfigRequest req, CancellationToken ct)
    {
        _emailService.Config.Template.Design = req.Design;
        _emailService.Config.Template.Html = req.Html;
        _emailService.Config.IsConfigured = true;

        await SendOkAsync();
    }
}
#endregion