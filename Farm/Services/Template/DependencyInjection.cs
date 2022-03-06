namespace Farm.Services.Template;

public static class DependencyInjection
{
    public static IServiceCollection AddTemplateService(this IServiceCollection services)
    {
        services.AddSingleton<ITemplateService, TemplateService>();

        return services;
    }
}