using Farm.Common.Guards;
using Farm.Models;
using Farm.Services.Campaign;
using FastEndpoints;

namespace Farm.Endpoints.Admin;
public class RemoveTargetRequest
{
    public string TargetId { get; set; } = String.Empty;
}

public class RemoveTargetEndpoint : Endpoint<RemoveTargetRequest>
{
    private readonly ICampaignService _campaignService;

    public RemoveTargetEndpoint(ICampaignService campaignService)
    {
        _campaignService = campaignService;
    }

    public override void Configure()
    {
        Verbs(Http.DELETE);
        Routes("/api/campaign/targets/{TargetId}");
        Roles("Admin");
        Describe(e => e
            .Accepts<RemoveTargetRequest>("application/json")
            .Produces(200)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override async Task HandleAsync(RemoveTargetRequest req, CancellationToken ct)
    {
        var t = _campaignService.Targets.Find(t => t.Id == req.TargetId);

        Guard.Against.Null<Target>(t, "id", req.TargetId);

        _campaignService.Targets.Remove(t!);

        await SendOkAsync();
    }
}