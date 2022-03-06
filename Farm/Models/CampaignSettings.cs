namespace Farm.Models;

public class CampaignSettings
{
    public bool IsLaunched { get; set; } = false;
    public DateTime LaunchDate { get; set; } = DateTime.Now.AddMinutes(1);
    public int TimeInterval { get; set; } = 10;
}