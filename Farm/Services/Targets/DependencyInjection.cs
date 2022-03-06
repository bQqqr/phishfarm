namespace Farm.Services.Targets;

public static class DependencyInjection
{
    public static IServiceCollection AddTargetsService(this IServiceCollection services)
    {
        services.AddSingleton<ITargetsService, TargetsService>();

        return services;
    }
}