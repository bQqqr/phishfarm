using Farm.Common.Guards;
using Farm.Models;
using Farm.Services.Targets;
using FastEndpoints;

namespace Farm.Endpoints.Admin;
public class DeleteTargetRequest
{
    public string TargetId { get; set; } = String.Empty;
}

public class DeleteTargetEndpoint : Endpoint<DeleteTargetRequest>
{
    private readonly ITargetsService _campaignService;

    public DeleteTargetEndpoint(ITargetsService campaignService)
    {
        _campaignService = campaignService;
    }

    public override void Configure()
    {
        Verbs(Http.DELETE);
        Routes("/api/targets/{TargetId}");
        Roles("Admin");
        Describe(e => e
            .Accepts<DeleteTargetRequest>("application/json")
            .Produces(200)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override async Task HandleAsync(DeleteTargetRequest req, CancellationToken ct)
    {
        var t = _campaignService.Targets.Find(t => t.Id == req.TargetId);

        Guard.Against.Null<Target>(t, "id", req.TargetId);

        _campaignService.Targets.Remove(t!);

        await SendNoContentAsync();
    }
}