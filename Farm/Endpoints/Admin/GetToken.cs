using Farm.Common.Exceptions;
using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Validation;

namespace Farm.Endpoints.Admin;

#region Request
public class GetTokenRequest
{
    public string Password { get; set; } = String.Empty;
}
#endregion

#region Validator
public class GetTokenRequestValidator : Validator<GetTokenRequest>
{
    public GetTokenRequestValidator()
    {
        RuleFor(r => r.Password).NotEmpty().Length(1, 256);
    }
}
#endregion

#region Response
public class GetTokenResponse
{
    public string Token { get; set; } = String.Empty;
}
#endregion

#region Endpoint
public class GetTokenEndpoint : Endpoint<GetTokenRequest, GetTokenResponse>
{
    private readonly IConfiguration _configuration;

    public GetTokenEndpoint(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public override void Configure()
    {
        Verbs(Http.POST);
        Routes("/api/token");
        AllowAnonymous();
        Describe(e => e
            .Accepts<GetTokenRequest>("application/json")
            .Produces<GetTokenResponse>(200)
            .ProducesProblem(401));
    }

    public override Task HandleAsync(GetTokenRequest req, CancellationToken ct)
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
                expireAt: DateTime.Now.AddMinutes(20),
                roles: new[] { "Admin" });

        return Task.CompletedTask;
    }
}
#endregion