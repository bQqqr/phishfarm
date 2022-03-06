using Farm.Models;
using Farm.Services.Targets;
using FastEndpoints;

namespace Farm.Endpoints.Admin;

#region Endpoint
public class GetTargetsEndpoint : EndpointWithoutRequest<List<Target>>
{
    private readonly ITargetsService _campaignService;

    public GetTargetsEndpoint(ITargetsService campaignService)
    {
        _campaignService = campaignService;
    }

    public override void Configure()
    {
        Verbs(Http.GET);
        Routes("/api/targets");
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
