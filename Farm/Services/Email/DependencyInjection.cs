namespace Farm.Services.Email;

public static class DependencyInjection
{
    public static IServiceCollection AddEmailService(this IServiceCollection services)
    {
        services.AddSingleton<IEmailService, EmailService>();

        return services;
    }
}