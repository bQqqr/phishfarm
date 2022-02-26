using Farm.Common.Exceptions;
using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Validation;

namespace Farm.Endpoints.Admin;

public class AuthenticateRequest
{
    public string? Password { get; set; }
}

public class AuthenticateRequestValidator : Validator<AuthenticateRequest>
{
    public AuthenticateRequestValidator()
    {
        RuleFor(r => r.Password).Length(1, 256);
    }
}

public class AuthenticateResponse
{
    public string? Token { get; set; }
}

public class AuthenticateEndpoint : Endpoint<AuthenticateRequest, AuthenticateResponse>
{
    private readonly IConfiguration _configuration;

    public AuthenticateEndpoint(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/operator/actions/authenticate");
        AllowAnonymous();
    }

    public override Task HandleAsync(AuthenticateRequest req, CancellationToken ct)
    {
        var password = _configuration.GetSection("Password").Get<string>();
        if (req.Password != password)
            throw new ForbiddenAccessException();

        var symmetricKey = _configuration.GetSection("SymmetricKey").Get<string>();
        Response.Token = JWTBearer.CreateToken(
                signingKey: symmetricKey,
                expireAt: DateTime.UtcNow.AddMinutes(20),
                roles: new[] { "Admin" });

        return Task.CompletedTask;
    }
}