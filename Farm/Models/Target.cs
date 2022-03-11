using Farm.Common.Misc;

namespace Farm.Models;

public class Target
{
    public string Id { get; set; } = String.Empty;
    public string FirstName { get; set; } = String.Empty;
    public string LastName { get; set; } = String.Empty;
    public string EmailAddress { get; set; } = String.Empty;
    public DateTime DateRead { get; set; }
    public bool HasRead { get; set; } = false;
    public DateTime DateDownloaded { get; set; }
    public bool HasDownloaded { get; set; } = false;
    public BlobFile Maldoc { get; set; } = new BlobFile();
}