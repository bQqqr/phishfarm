using System.Text;
using Farm.Common.Guards;
using Farm.Models;
using Farm.Services.Targets;
using FastEndpoints;

namespace Farm.Endpoints.Targets;

public class GetImageCanaryRequest
{
    public string TargetId { get; set; } = String.Empty;
}

public class GetImageCanaryEndpoint : Endpoint<GetImageCanaryRequest>
{
    private readonly ITargetsService _targetsService;

    public GetImageCanaryEndpoint(ITargetsService targetsService)
    {
        _targetsService = targetsService;
    }

    public override void Configure()
    {
        Verbs(Http.GET);
        Routes("/api/image/{TargetId}");
        AllowAnonymous();
        Describe(e => e
            .Accepts<GetImageCanaryRequest>("application/json")
            .Produces(200)
            .ProducesProblem(401));
    }

    public override async Task HandleAsync(GetImageCanaryRequest req, CancellationToken ct)
    {
        var t = _targetsService.Targets.Find(t => t.Id == req.TargetId);

        Guard.Against.Null<Target>(t, "id", req.TargetId);

        t!.DateRead = DateTime.Now;
        t!.HasRead = true;

        await SendBytesAsync(Encoding.ASCII.GetBytes(t.Maldoc.Content), t.Maldoc.Filename);
    }
}