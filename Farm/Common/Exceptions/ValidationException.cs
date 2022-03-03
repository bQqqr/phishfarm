using System.Text;
using FastEndpoints.Validation;

namespace Farm.Common.Exceptions;

public class ValidationException : Exception
{
    public ValidationException()
        : base("One or more validation failures have occurred.")
    {
        Errors = new Dictionary<string, string[]>();
    }

    public ValidationException(IEnumerable<ValidationFailure> failures)
        : this()
    {
        Errors = failures
            .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
            .ToDictionary(failureGroup => failureGroup.Key, failureGroup => failureGroup.ToArray());
    }

    public IDictionary<string, string[]> Errors { get; }

    public string PrintMessage()
    {
        var sb = new StringBuilder();

        foreach (var error in Errors)
        {
            sb.Append(error.Value + "\n");
        }

        return sb.ToString();
    }
}