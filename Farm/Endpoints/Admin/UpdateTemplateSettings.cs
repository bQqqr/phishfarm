using Farm.Services.Template;
using FastEndpoints;
using FastEndpoints.Validation;

namespace Farm.Endpoints.Admin;

#region Request
public class UpdateTemplateSettingsRequest
{
    public string Design { get; set; } = String.Empty;
    public string Html { get; set; } = String.Empty;
}
#endregion

#region Validator
public class UpdateTemplateSettingsRequestValidator : Validator<UpdateTemplateSettingsRequest>
{
    public UpdateTemplateSettingsRequestValidator()
    {
        RuleFor(r => r.Design).NotEmpty();
        RuleFor(r => r.Html).NotEmpty();
    }
}
#endregion

#region Endpoint
public class UpdateTemplateSettingsEndpoint : Endpoint<UpdateTemplateSettingsRequest>
{
    private readonly ITemplateService _templateService;

    public UpdateTemplateSettingsEndpoint(ITemplateService templateService)
    {
        _templateService = templateService;
    }

    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/template-settings");
        Roles("Admin");
        Describe(e => e
            .Accepts<UpdateEmailSettingsRequest>("application/json")
            .Produces(200)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override async Task HandleAsync(UpdateTemplateSettingsRequest req, CancellationToken ct)
    {
        _templateService.Settings.Design = req.Design;
        _templateService.Settings.Html = req.Html;
        _templateService.Settings.IsConfigured = true;

        await SendNoContentAsync();
    }
}
#endregion