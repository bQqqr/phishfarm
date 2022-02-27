namespace Farm.Services.Campaign;

public class Target
{
    public string? Guid { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? EmailAddress { get; set; }
    public IFormFile? Maldoc { get; set; }
}