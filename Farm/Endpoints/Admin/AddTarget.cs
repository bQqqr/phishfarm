using Farm.Common.Guards;
using Farm.Services.Campaign;
using FastEndpoints;
using FastEndpoints.Validation;

namespace Farm.Endpoints.Admin;

public class AddTargetRequest
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? EmailAddress { get; set; }
    public IFormFile? Maldoc { get; set; }
}

public class AddTargetRequestValidator : Validator<AddTargetRequest>
{
    public AddTargetRequestValidator()
    {
        RuleFor(r => r.FirstName).NotNull().NotEmpty().MaximumLength(32);
        RuleFor(r => r.LastName).NotNull().NotEmpty().MaximumLength(32);
        RuleFor(r => r.EmailAddress).NotNull().NotEmpty().EmailAddress();
    }
}

public class AddTargetEndpoint : Endpoint<AddTargetRequest>
{
    private readonly ICampaignService _campaignService;

    public AddTargetEndpoint(ICampaignService campaignService)
    {
        _campaignService = campaignService;
    }

    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/operator/add-target");
        Roles("Admin");
        AllowFileUploads();
    }

    public override Task HandleAsync(AddTargetRequest req, CancellationToken ct)
    {
        var existingTarget = _campaignService.Targets
            .Find(t => t.EmailAddress == req.EmailAddress);

        Guard.Against.NotNull<Target>(existingTarget, "Email-Address", req.EmailAddress!);

        _campaignService.Targets
            .Add(new Target
            {
                 = Guid
                FirstName = req.FirstName,
                LastName = req.LastName,
                EmailAddress = req.EmailAddress,
                Maldoc = req.Maldoc
            });

        return Task.CompletedTask;
    }
}