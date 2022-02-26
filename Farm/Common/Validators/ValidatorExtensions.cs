using FastEndpoints.Validation;

namespace Athena.Application.Common.Validators;

public static class ValidatorExtensions
{
    public static IRuleBuilder<T, string?> HostnameOrIpAddress<T>(this IRuleBuilder<T, string?> ruleBuilder)
    {
        var options = ruleBuilder
            .Matches(@"^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$")
            .WithMessage("Value must be a Hostname or an IP Address.");

        return options;
    }
}
