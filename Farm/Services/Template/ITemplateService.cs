using Farm.Models;

namespace Farm.Services.Template;

public interface ITemplateService
{
    TemplateSettings Settings { get; set; }

    string FinalMessage(Target target);
}