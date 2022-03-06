using Farm.Models;

namespace Farm.Services.Targets;

public class TargetsService : ITargetsService
{
    public List<Target> Targets { get; set; } = new List<Target>();
}