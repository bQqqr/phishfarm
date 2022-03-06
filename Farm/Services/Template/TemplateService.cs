using Farm.Constants;
using Farm.Models;

namespace Farm.Services.Template;

public class TemplateService : ITemplateService
{
    public TemplateSettings Settings { get; set; } = new TemplateSettings();
    private readonly IConfiguration _configuration;

    public TemplateService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public string FinalMessage(Target target)
    {
        return Settings.Html
            .Replace(PlaceholderConstants.Email, target.EmailAddress)
            .Replace(PlaceholderConstants.FirstName, target.FirstName)
            .Replace(PlaceholderConstants.LastName, target.LastName)
            .Replace(PlaceholderConstants.LogoLink, GenLogoLink(target.Id))
            .Replace(PlaceholderConstants.MaldocLink, GenMaldocLink(target.Id));
    }

    private string GenLogoLink(string targetId)
    {
        var host = _configuration
            .GetSection("Host")
            .Get<string>();

        return $"https://{host}/api/logo/{targetId}";
    }

    private string GenMaldocLink(string targetId)
    {
        var host = _configuration
            .GetSection("Host")
            .Get<string>();

        return $"https://{host}/api/files/{targetId}";
    }
}