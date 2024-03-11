namespace Datadrasil
{
	/// <summary>
	/// Class containing the LogError method for logging errors when a exception is thrown.
	/// </summary>
	public static class ErrorLogger
	{
		/// <summary>
		/// Method that logs if an exception that is thrown.
		/// </summary>
		/// <param name="ex">The exception information</param>
		public static void LogError(Exception ex)
		{
			string fileName = $"{DateTime.Now:yyyyMMdd_HHmmss}_ErrorLog.txt";
			string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, fileName);

			using (StreamWriter writer = File.AppendText(filePath))
			{
				writer.WriteLine($"[{DateTime.Now}] {ex.GetType().FullName}: {ex.Message}");
				writer.WriteLine($"StackTrace: {ex.StackTrace}");
				writer.WriteLine(new string('-', 30));
			}
		}
	}
}
