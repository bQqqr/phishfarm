using Farm.Common.Middleware;
using Farm.Services.Campaign;
using Farm.Services.Email;
using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Swagger;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddFastEndpoints();
builder.Services.AddAuthenticationJWTBearer(builder.Configuration.GetSection("SymmetricKey").Get<string>());
builder.Services.AddSwaggerDoc();
builder.Services.AddEmailService();
builder.Services.AddCampaignService();

var app = builder.Build();
app.UseCustomExceptionHandler();
app.UseAuthentication();
app.UseAuthorization();
app.UseFastEndpoints();
app.UseOpenApi();
app.UseSwaggerUi3(s => s.ConfigureDefaults());
app.Run();
