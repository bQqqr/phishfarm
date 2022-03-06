using Farm.Common.Exceptions;
using Farm.Services.Campaign;
using Farm.Services.Email;
using Farm.Services.Targets;
using Farm.Services.Template;
using FastEndpoints;
using FastEndpoints.Validation;

namespace Farm.Endpoints.Admin;

public class LaunchCampaignRequest
{
    public DateTime LaunchDate { get; set; }
    public int TimeInterval { get; set; }
}

public class LaunchCampaignRequestValidator : Validator<LaunchCampaignRequest>
{
    public LaunchCampaignRequestValidator()
    {
        RuleFor(r => r.LaunchDate).NotNull();
        RuleFor(r => r.TimeInterval).InclusiveBetween(1, 100);
    }
}

public class LaunchCampaignEndpoint : Endpoint<LaunchCampaignRequest>
{
    private readonly ICampaignService _campaignService;
    private readonly ITargetsService _targetsService;
    private readonly IEmailService _emailService;
    private readonly ITemplateService _templateService;

    public LaunchCampaignEndpoint(ICampaignService campaignService,
        ITargetsService targetsService,
        IEmailService emailService,
        ITemplateService templateService)
    {
        _campaignService = campaignService;
        _targetsService = targetsService;
        _emailService = emailService;
        _templateService = templateService;
    }

    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/actions/launch-campaign");
        Roles("Admin");
        Describe(e => e
            .Accepts<LaunchCampaignRequest>("application/json")
            .Produces(204)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override Task HandleAsync(LaunchCampaignRequest req, CancellationToken ct)
    {
        _campaignService.Settings.LaunchDate = req.LaunchDate;
        _campaignService.Settings.TimeInterval = req.TimeInterval;

        if (!_emailService.Settings.IsConfigured)
            throw new BadRequestException("You must configure the email settings.");

        if (!_templateService.Settings.IsConfigured)
            throw new BadRequestException("You must draw the message template.");

        if (_targetsService.Targets.Count == 0)
            throw new BadRequestException("You must specify at least one target.");

        if (_campaignService.Settings.IsLaunched)
            throw new BadRequestException("Campaign has already launched.");

        _campaignService.LaunchCampaign();

        _campaignService.Settings.IsLaunched = true;

        return Task.CompletedTask;
    }

    private TimeSpan BetweenTodayAndDate(DateTime date)
    {
        return TimeSpan.FromSeconds((date - DateTime.Now).TotalSeconds);
    }
}