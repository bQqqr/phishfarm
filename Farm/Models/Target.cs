namespace Farm.Models;

public class Target
{
    public string Id { get; set; } = String.Empty;
    public string FirstName { get; set; } = String.Empty;
    public string LastName { get; set; } = String.Empty;
    public string EmailAddress { get; set; } = String.Empty;
    public Maldoc Maldoc { get; set; } = new Maldoc();
}