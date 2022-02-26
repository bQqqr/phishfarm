namespace Farm.Common.Exceptions;

public class BadRequestException : Exception
{
    public BadRequestException(string? error) : base(error)
    {
    }

    public BadRequestException() : base()
    {
    }
}