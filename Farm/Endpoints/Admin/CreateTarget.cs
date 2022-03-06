using Farm.Common.Misc;
using Farm.Models;
using Farm.Services.Targets;
using FastEndpoints;
using FastEndpoints.Validation;

namespace Farm.Endpoints.Admin;

#region Request
public class CreateTargetRequest
{
    public string FirstName { get; set; } = String.Empty;
    public string LastName { get; set; } = String.Empty;
    public string EmailAddress { get; set; } = String.Empty;
    public string MaldocContent { get; set; } = String.Empty;
    public string MaldocFilename { get; set; } = String.Empty;
}
#endregion

#region  Validator
public class CreateTargetRequestValidator : Validator<CreateTargetRequest>
{
    public CreateTargetRequestValidator()
    {
        RuleFor(r => r.FirstName).NotEmpty().MaximumLength(20);
        RuleFor(r => r.LastName).NotEmpty().MaximumLength(20);
        RuleFor(r => r.EmailAddress).NotEmpty().EmailAddress();
        RuleFor(r => r.MaldocContent).NotNull();
        RuleFor(r => r.MaldocFilename).NotEmpty();
    }
}
#endregion

#region Response
public class CreateTargetResponse
{
    public string Id { get; set; } = String.Empty;
}
#endregion

#region Endpoint
public class CreateTargetEndpoint : Endpoint<CreateTargetRequest, CreateTargetResponse>
{
    private readonly ITargetsService _campaignService;

    public CreateTargetEndpoint(ITargetsService campaignService)
    {
        _campaignService = campaignService;
    }

    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/targets");
        Roles("Admin");
        Describe(e => e
            .Accepts<CreateTargetRequest>("application/json")
            .Produces<CreateTargetResponse>(200)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override Task HandleAsync(CreateTargetRequest req, CancellationToken ct)
    {
        var t = new Target
        {
            Id = Guid.NewGuid().ToString().Replace("-", ""),
            FirstName = req.FirstName,
            LastName = req.LastName,
            EmailAddress = req.EmailAddress,
            Maldoc = new BlobFile
            {
                Content = req.MaldocContent,
                Filename = req.MaldocFilename
            }
        };

        _campaignService.Targets.Add(t);

        Response.Id = t.Id;

        return Task.CompletedTask;
    }
}
#endregion