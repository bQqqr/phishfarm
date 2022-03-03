using Farm.Models;
using Farm.Services.Email;
using FastEndpoints;

namespace Farm.Endpoints.Admin;

#region Endpoint
public class ReadTemplateSettingsEndpoint : EndpointWithoutRequest<Template>
{
    private readonly IEmailService _emailService;

    public ReadTemplateSettingsEndpoint(IEmailService emailService)
    {
        _emailService = emailService;
    }

    public override void Configure()
    {
        Verbs(Http.GET);
        Routes("/api/template");
        Roles("Admin");
        Describe(e => e
            .Produces<Template>(200)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override Task HandleAsync(CancellationToken ct)
    {
        Response.IsConfigured = _emailService.Config.Template.IsConfigured;
        Response.Design = _emailService.Config.Template.Design;
        Response.Html = _emailService.Config.Template.Html;

        return Task.CompletedTask;
    }
}
#endregion