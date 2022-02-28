namespace Farm.Models;

public class Target
{
    public int TargetId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? EmailAddress { get; set; }
    public List<Event> Events { get; set; } = new List<Event>();
}