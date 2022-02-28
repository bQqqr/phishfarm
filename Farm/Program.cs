using Farm.Common.Middleware;
using Farm.Services.Email;
using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Swagger;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddFastEndpoints();
builder.Services.AddAuthenticationJWTBearer(builder.Configuration.GetSection("SymmetricKey").Get<string>());
builder.Services.AddSwaggerDoc();
builder.Services.AddEmailService();
builder.Services.AddCors(c =>
{
    c.AddPolicy(name: "myCorsPolicy", b =>
    {
        b.WithOrigins(new string[] { "http://localhost:3000" });
        b.AllowAnyHeader();
        b.AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCustomExceptionHandler();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("myCorsPolicy");
app.UseFastEndpoints();
app.UseOpenApi();
app.UseSwaggerUi3(s => s.ConfigureDefaults());
app.Run();