using Farm.Models;
using Farm.Services.Template;
using FastEndpoints;

namespace Farm.Endpoints.Admin;

#region Endpoint
public class GetTemplateSettingsEndpoint : EndpointWithoutRequest<TemplateSettings>
{
    private readonly ITemplateService _templateService;

    public GetTemplateSettingsEndpoint(ITemplateService templateService)
    {
        _templateService = templateService;
    }

    public override void Configure()
    {
        Verbs(Http.GET);
        Routes("/api/template-settings");
        Roles("Admin");
        Describe(e => e
            .Produces<TemplateSettings>(200)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override Task HandleAsync(CancellationToken ct)
    {
        Response.IsConfigured = _templateService.Settings.IsConfigured;
        Response.Design = _templateService.Settings.Design;
        Response.Html = _templateService.Settings.Html;

        return Task.CompletedTask;
    }
}
#endregion