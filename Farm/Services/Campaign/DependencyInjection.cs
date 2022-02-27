namespace Farm.Services.Campaign;

public static class DependencyInjection
{
    public static IServiceCollection AddCampaignService(this IServiceCollection services)
    {
        services.AddSingleton<ICampaignService, CampaignService>();

        return services;
    }
}