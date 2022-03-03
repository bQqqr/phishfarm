using Farm.Models;

namespace Farm.Services.Campaign;

public class CampaignService : ICampaignService
{
    public List<Target> Targets { get; set; } = new List<Target>();
}