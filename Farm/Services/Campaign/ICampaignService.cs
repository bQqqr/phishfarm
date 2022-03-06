using Farm.Models;

namespace Farm.Services.Campaign;

public interface ICampaignService
{
    CampaignSettings Settings { get; set; }
    void LaunchCampaign();
}