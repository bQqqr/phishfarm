using Farm.Common.Guards;
using Farm.Models;
using Farm.Services.Targets;
using FastEndpoints;

namespace Farm.Endpoints.Targets;

public class GetImageRequest
{
    public string TargetId { get; set; } = String.Empty;
}

public class GetImageEndpoint : Endpoint<GetImageRequest>
{
    private readonly ITargetsService _targetsService;

    public GetImageEndpoint(ITargetsService targetsService)
    {
        _targetsService = targetsService;
    }

    public override void Configure()
    {

        Verbs(Http.GET);
        Routes("/api/images/{TargetId}");
        AllowAnonymous();
        Describe(e => e
            .Accepts<GetImageRequest>("application/json")
            .Produces(200)
            .ProducesProblem(401));
    }

    public override async Task HandleAsync(GetImageRequest req, CancellationToken ct)
    {
        var t = _targetsService.Targets.Find(t => t.Id == req.TargetId);

        Guard.Against.Null<Target>(t, "id", req.TargetId);

        t!.DateRead = DateTime.UtcNow;
        t!.HasRead = true;

        await SendBytesAsync(new byte[5], t.Id);
    }
}