namespace Farm.Models;

public class Maldoc
{
    public string? MaldocId { get; set; }
    public string? TargetId { get; set; }
    public string? Filename { get; set; }
    public string? Filetype { get; set; }
    public byte[]? Contents { get; set; }
}