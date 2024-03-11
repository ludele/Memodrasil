namespace Datadrasil
{
	/// <summary>
	/// Not implemented: Class responsible for processing and managing data representations.
	/// </summary>
	public class DataProcessor
	{
		private readonly FormatHandlerManager<DataRepresentation> formatHandler;
		// Dictionary to store saved data representations with identifiers.
		private readonly Dictionary<string, DataRepresentation> savedLists;
		private readonly Configuration configuration;

		/// <summary>
		/// Initializes a new instance of the DataProcessor class
		/// </summary>
		/// <param name="initFormatHandler">The initialization of the format handler manager</param>
		public DataProcessor(FormatHandlerManager<DataRepresentation> initFormatHandler)
		{
			this.formatHandler = initFormatHandler;
			this.savedLists = new Dictionary<string, DataRepresentation>();
			this.configuration = new Configuration(formatHandler);
		}

		/// <summary>
		/// Saves a data representation with a specified identifier.
		/// </summary>
		/// <param name="identifier">The identifier for the saved data.</param>
		/// <param name="data">The data representation to be saved.</param>
		public void SaveData(string identifier, DataRepresentation data)
		{
			savedLists[identifier] = data;
		}

		/// <summary>
		/// Loads a saved data represenation based on its identifier.
		/// </summary>
		/// <param name="identifier">The identifier of the saved data representation</param>
		/// <returns>The loaded data representation</returns>
		/// <exception cref="ArgumentException"></exception>
		public DataRepresentation LoadDataRepresentation(string identifier)
		{
			if (savedLists.TryGetValue(identifier, out DataRepresentation data))
			{
				return data;
			}

			throw new ArgumentException($"List with identifier '{identifier}' not found.");
		}
	}
}
