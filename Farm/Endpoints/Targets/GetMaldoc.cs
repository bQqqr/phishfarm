using Farm.Common.Guards;
using Farm.Models;
using Farm.Services.Targets;
using FastEndpoints;

namespace Farm.Endpoints.Targets;

public class GetMaldocRequest
{
    public string TargetId { get; set; } = String.Empty;
}

public class GetMaldocEndpoint : Endpoint<GetMaldocRequest>
{
    private readonly ITargetsService _targetsService;

    public GetMaldocEndpoint(ITargetsService targetsService)
    {
        _targetsService = targetsService;
    }

    public override void Configure()
    {

        Verbs(Http.GET);
        Routes("/api/files/{TargetId}");
        AllowAnonymous();
        Describe(e => e
            .Accepts<GetMaldocRequest>("application/json")
            .Produces(200)
            .ProducesProblem(401));
    }

    public override async Task HandleAsync(GetMaldocRequest req, CancellationToken ct)
    {
        var t = _targetsService.Targets.Find(t => t.Id == req.TargetId);

        Guard.Against.Null<Target>(t, "id", req.TargetId);

        t!.DateRead = DateTime.Now;
        t!.HasRead = true;

        await SendBytesAsync(Convert.FromBase64String(t.Maldoc.Content), t.Maldoc.Filename);
    }
}