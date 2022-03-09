using Farm.Models;
using Farm.Services.Email;
using Farm.Services.Targets;
using Farm.Services.Template;
using Hangfire;

namespace Farm.Services.Campaign;

public class CampaignService : ICampaignService
{
    public CampaignSettings Settings { get; set; } = new CampaignSettings();
    private readonly IEmailService _emailService;
    private readonly ITemplateService _templateService;
    private readonly ITargetsService _targetsService;

    public CampaignService(IEmailService emailService,
        ITemplateService templateService,
        ITargetsService targetsService)
    {
        _emailService = emailService;
        _templateService = templateService;
        _targetsService = targetsService;
    }

    public void LaunchCampaign()
    {
        var targets = _targetsService.Targets;

        int c = 0;
        foreach (var target in targets)
        {
            var message = _templateService.FinalMessage(target);



            BackgroundJob.Schedule(
                methodCall: () => _emailService.SendEmail(target.EmailAddress, message),
                delay: BetweenTodayAndDate(Settings.LaunchDate) +
                    TimeSpan.FromMinutes(Settings.TimeInterval) * c);
        }
    }

    private TimeSpan BetweenTodayAndDate(DateTime date)
    {
        return TimeSpan.FromSeconds((date - DateTime.Now).TotalSeconds);
    }
}