namespace WebManagaTask.Const
{
    public static class  FunctionConst
    {
        public static string NormalizeString(string? input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return input; 
            }
            string lowerCaseString = input.ToLower();
            string noSpacesString = lowerCaseString.Replace(" ", "");
            return noSpacesString;
        }

    }
}
