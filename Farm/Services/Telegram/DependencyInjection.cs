namespace Farm.Services.Telegram
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddTelegramService(this IServiceCollection services)
        {
            services.AddSingleton<ITelegramService, TelegramService>();

            return services;
        }
    }
}