namespace Datadrasil
{
	/// <summary>
	/// Program-class entry point for the program, runs the Main function
	/// </summary>
	internal class Program
	{
		/// <summary>
		/// The main function, runs the menu-loop in a try-statement,
		/// if an exception gets throwed the program logs the error
		/// and restarts the loop
		/// </summary>
		public static void main()
		{
			while (true)
			{
				try
				{
					Console.WriteLine(); // Too create some space
					new Menu().Execute();
				}
				catch (Exception ex)
				{
					ErrorLogger.LogError(ex);
					Console.WriteLine("Some error accorred, the program will return to the main menu");
					System.Threading.Thread.Sleep(1000);
					Console.Clear();
					continue;
				}
			}
		}
	}
}
