using Farm.Models;
using Farm.Services.Campaign;
using FastEndpoints;

namespace Farm.Endpoints.Admin;

#region Endpoint
public class ReadTargetsEndpoint : EndpointWithoutRequest<List<Target>>
{
    private readonly ICampaignService _campaignService;

    public ReadTargetsEndpoint(ICampaignService campaignService)
    {
        _campaignService = campaignService;
    }

    public override void Configure()
    {
        Verbs(Http.GET);
        Routes("/api/campaign/targets");
        Roles("Admin");
        Describe(e => e
            .Produces<List<Target>>(200)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override Task HandleAsync(CancellationToken ct)
    {
        Response = _campaignService.Targets;

        return Task.CompletedTask;
    }
}
#endregion
