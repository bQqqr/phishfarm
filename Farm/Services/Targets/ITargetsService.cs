using Farm.Models;

namespace Farm.Services.Targets;

public interface ITargetsService
{
    List<Target> Targets { get; set; }
}