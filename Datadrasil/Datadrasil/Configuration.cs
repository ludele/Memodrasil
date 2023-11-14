namespace Datadrasil
{
	/// <summary>
	/// Not implemented.
	/// Represents the configuration interpreter for sorting data.
	/// </summary>
	public class Configuration
	{
		private readonly FormatHandlerManager<DataRepresentation> formatHandler;

		/// <summary>
		/// Initializes a new instance of the Configuration class.
		/// </summary>
		/// <param name="formatHandlerManager">The format handler manager.</param>
		public Configuration(FormatHandlerManager<DataRepresentation> initFormatHandlerManager)
		{
			this.formatHandler = initFormatHandlerManager;
		}

		/// <summary>
		/// Retrives the sorting key from user input.
		/// </summary>
		/// <returns></returns>
		private string GetSortingKey()
		{
			Console.WriteLine("Enter the value for sorting:");
			return Console.ReadLine();
		}

		/// <summary>
		/// Determines whether the provided value is numeric.
		/// </summary>
		/// <param name="value"></param>
		/// <returns></returns>
		private bool IsNumericValue(string value)
		{
			return double.TryParse(value, out _);
		}

		/// <summary>
		/// Retrives the sorting order from user input.
		/// </summary>
		/// <returns>True for ascending, false for descending order</returns>
		private bool GetSortOrder()
		{
			Console.WriteLine("Enter 'asc' for ascending order or 'desc' for descending order:");
			string order = Console.ReadLine().ToLower();
			return order == "asc";
		}
	}
}
