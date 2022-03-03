using Farm.Models;

namespace Farm.Services.Campaign;

public interface ICampaignService
{
    List<Target> Targets { get; set; }
}