using Farm.Common.Exceptions;
using Farm.Common.Validators;
using Farm.Services.Campaign;
using Farm.Services.Email;
using FastEndpoints;
using FastEndpoints.Validation;

namespace Farm.Endpoints.Admin;

#region Request
public class UpdateEmailSettingsRequest
{
    public bool EnabledSsl { get; set; } = false;
    public string SmtpHost { get; set; } = String.Empty;
    public int SmtpPort { get; set; } = 587;
    public string SmtpUsername { get; set; } = String.Empty;
    public string SmtpPassword { get; set; } = String.Empty;
    public string FromEmail { get; set; } = String.Empty;
    public string FromName { get; set; } = String.Empty;
    public string Subject { get; set; } = String.Empty;
}
#endregion

#region Validator
public class UpdateEmailSettingsRequestValidator : Validator<UpdateEmailSettingsRequest>
{
    public UpdateEmailSettingsRequestValidator()
    {
        RuleFor(r => r.SmtpHost).NotEmpty().MaximumLength(253).HostnameOrIpAddress();
        RuleFor(r => r.SmtpPort).InclusiveBetween(0, 65535);
        RuleFor(r => r.SmtpUsername).NotEmpty().MaximumLength(64);
        RuleFor(r => r.SmtpPassword).NotEmpty().MaximumLength(64);
        RuleFor(r => r.FromEmail).NotEmpty().MaximumLength(254).EmailAddress();
        RuleFor(r => r.FromName).NotEmpty().MaximumLength(78);
        RuleFor(r => r.Subject).NotEmpty().MaximumLength(998);
    }
}
#endregion

#region Endpoint
public class UpdateEmailSettingsEndpoint : Endpoint<UpdateEmailSettingsRequest>
{
    private readonly IEmailService _emailService;
    private readonly ICampaignService _campaignService;

    public UpdateEmailSettingsEndpoint(IEmailService emailService,
        ICampaignService campaignService)
    {
        _emailService = emailService;
        _campaignService = campaignService;
    }

    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/email-settings");
        Roles("Admin");
        Describe(e => e
            .Accepts<UpdateEmailSettingsRequest>("application/json")
            .Produces(200)
            .ProducesProblem(401)
            .ProducesProblem(400));
    }

    public override async Task HandleAsync(UpdateEmailSettingsRequest req, CancellationToken ct)
    {
        if (_campaignService.Settings.IsLaunched)
            throw new BadRequestException("Campaign is already launch. You can not update email settings.");

        _emailService.Settings.EnabledSsl = req.EnabledSsl;
        _emailService.Settings.SmtpHost = req.SmtpHost;
        _emailService.Settings.SmtpPort = req.SmtpPort;
        _emailService.Settings.SmtpUsername = req.SmtpUsername;
        _emailService.Settings.SmtpPassword = req.SmtpPassword;
        _emailService.Settings.FromEmail = req.FromEmail;
        _emailService.Settings.FromName = req.FromName;
        _emailService.Settings.Subject = req.Subject;
        _emailService.Settings.IsConfigured = true;

        await SendNoContentAsync();
    }
}
#endregion