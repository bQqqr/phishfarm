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
        Settings.Html = Settings.Html.Replace(PlaceholderConstants.Email, target.EmailAddress);
        Settings.Html = Settings.Html.Replace(PlaceholderConstants.FirstName, target.FirstName);
        Settings.Html = Settings.Html.Replace(PlaceholderConstants.LastName, target.LastName);
        Settings.Html = Settings.Html.Replace($"</body>", $"<img heigh='0px' width='0px' src='{GenLogoLink(target.Id)}'></body>");
        Settings.Html = Settings.Html.Replace(PlaceholderConstants.MaldocLink, GenMaldocLink(target.Id));

        return Settings.Html;
    }

    private string GenLogoLink(string targetId)
    {
        var host = _configuration
            .GetSection("Host")
            .Get<string>();

        return $"https://{host}/api/images/{targetId}";
    }

    private string GenMaldocLink(string targetId)
    {
        var host = _configuration
            .GetSection("Host")
            .Get<string>();

        return $"https://{host}/api/files/{targetId}";
    }
}