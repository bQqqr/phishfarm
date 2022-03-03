using Farm.Common.Exceptions;
using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Validation;

namespace Farm.Endpoints.Admin;

#region Request
public class AuthenticateRequest
{
    public string Password { get; set; } = String.Empty;
}
#endregion

#region Validator
public class AuthenticateRequestValidator : Validator<AuthenticateRequest>
{
    public AuthenticateRequestValidator()
    {
        RuleFor(r => r.Password).NotEmpty().Length(1, 256);
    }
}
#endregion

#region Response
public class AuthenticateResponse
{
    public string Token { get; set; } = String.Empty;
}
#endregion

#region Endpoint
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
        Routes("/api/auth");
        AllowAnonymous();
        Describe(e => e
            .Accepts<AuthenticateRequest>("application/json")
            .Produces<AuthenticateResponse>(200)
            .ProducesProblem(401));
    }

    public override Task HandleAsync(AuthenticateRequest req, CancellationToken ct)
    {
        var p = _configuration
            .GetSection("Password")
            .Get<string>();

        if (req.Password != p)
            throw new UnauthorizedAccessException();

        var symmetricKey = _configuration
            .GetSection("SymmetricKey")
            .Get<string>();

        Response.Token = JWTBearer.CreateToken(
                signingKey: symmetricKey,
                expireAt: DateTime.UtcNow.AddMinutes(20),
                roles: new[] { "Admin" });

        return Task.CompletedTask;
    }
}
#endregion