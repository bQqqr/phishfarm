using Farm.Common.Exceptions;

namespace Farm.Common.Guards
{
    public static class CommonGuards
    {
        public static void Null<T>(this IGuardClause guardClause, T? input, string key, string value)
        {
            if (input == null)
                throw new NotFoundException($"Entity /w `{key}: {value}` was not found.");
        }

        public static void NotNull<T>(this IGuardClause guardClause, T? input, string key, string value)
        {
            if (input != null)
                throw new NotFoundException($"Entity /w `{key}: {value}` already exists.");
        }
    }
}