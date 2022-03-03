using Farm.Common.Middleware;
using Farm.Services.Campaign;
using Farm.Services.Email;
using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Swagger;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((ctx, lc) => lc
    .WriteTo.Console());

builder.Services.AddFastEndpoints();
builder.Services.AddAuthenticationJWTBearer(builder.Configuration.GetSection("SymmetricKey").Get<string>());
builder.Services.AddSwaggerDoc();
builder.Services.AddEmailService();
builder.Services.AddCampaignService();
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
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("myCorsPolicy");
app.UseFastEndpoints();
app.UseOpenApi();
app.UseSwaggerUi3(c => c.ConfigureDefaults());
app.Run();