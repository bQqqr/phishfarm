using Farm.Models;
using Farm.Services.Campaign;
using FastEndpoints;

namespace Farm.Endpoints.Admin;

public class GetCampaignSettingsEndpoint : EndpointWithoutRequest<CampaignSettings>
{
    private readonly ICampaignService _campaignService;

    public GetCampaignSettingsEndpoint(ICampaignService campaignService)
    {
        _campaignService = campaignService;
    }

    public override void Configure()
    {
        Verbs(Http.GET);
        Routes("/api/campaign-settings");
        Roles("Admin");
        Describe(e => e
            .Produces<CampaignSettings>(200)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override Task HandleAsync(CancellationToken ct)
    {
        Response.IsLaunched = _campaignService.Settings.IsLaunched;
        Response.LaunchDate = _campaignService.Settings.LaunchDate;
        Response.TimeInterval = _campaignService.Settings.TimeInterval;

        return Task.CompletedTask;
    }
}

