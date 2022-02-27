using Farm.Services.Campaign;
using FastEndpoints;

namespace Farm.Endpoints.Admin;

public class ListTargetsResponse
{
    public List<Target> Targets { get; set; } = new List<Target>();
}

public class ListTargetsEndpoint : EndpointWithoutRequest<ListTargetsResponse>
{
    private readonly ICampaignService _campaignService;

    public ListTargetsEndpoint(ICampaignService campaignService)
    {
        _campaignService = campaignService;
    }

    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/operator/list-targets");
        Roles("Admin");
    }

    public override Task HandleAsync(CancellationToken ct)
    {
        Response.Targets.AddRange(_campaignService.Targets);

        return Task.CompletedTask;
    }
}