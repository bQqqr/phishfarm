using Farm.Common.Middleware;
using Farm.Services.Campaign;
using Farm.Services.Email;
using Farm.Services.Targets;
using Farm.Services.Telegram;
using Farm.Services.Template;
using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Swagger;
using Hangfire;
using Hangfire.MemoryStorage;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

var key = builder.Configuration.GetSection("SymmetricKey").Get<string>();

builder.Host.UseSerilog((ctx, lc) => lc
    .WriteTo.Console());

builder.Services.AddFastEndpoints();
builder.Services.AddAuthenticationJWTBearer(key);
builder.Services.AddSwaggerDoc();
builder.Services.AddHangfire(c =>
{
    c.UseMemoryStorage();
});

builder.Services.AddHangfireServer();
builder.Services.AddEmailService();
builder.Services.AddTemplateService();
builder.Services.AddTargetsService();
builder.Services.AddCampaignService();
builder.Services.AddTelegramService();
builder.Services.AddCors(c =>
{
    c.AddPolicy(name: "myCorsPolicy", b =>
    {
        b.AllowAnyOrigin();
        b.AllowAnyHeader();
        b.AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCustomExceptionHandler();
app.UseSerilogRequestLogging();
app.UseHangfireDashboard();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("myCorsPolicy");
app.UseFastEndpoints();
app.UseOpenApi();
app.UseSwaggerUi3(c => c.ConfigureDefaults());
app.Run();
