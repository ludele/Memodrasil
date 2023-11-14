namespace Datadrasil
{
	/// <summary>
	/// Class responsible for creating and seralizing data representations.
	/// </summary>
	public class DataCreator
	{
		public const string tab = "     "; // Tab space for easier formating in output.
		public static FormatHandlerManager<DataRepresentation> formatHandler = new FormatHandlerManager<DataRepresentation>();

		/// <summary>
		/// Allows the user to choose a filename on the specified format.
		/// </summary>
		/// <param name="format">The choosen format for the data</param>
		/// <returns>The choosen filename with the file extension of the choosen format</returns>
		public static string ChooseFormatAndFileName(string format)
		{
			while (true)
			{
				Console.Write("\nEnter filename (without extension)\n: ");
				string input = Console.ReadLine();

				if (IsValidFilename(input) && !string.IsNullOrEmpty(input))
				{
					
					string fileName = $"{input}.{format.ToLower()}";
					return fileName;
				}

				else
				{
					Console.Clear();
					Console.WriteLine($"Invalid filename: {input}");
				}
			}
        }

		/// <summary>
		/// Checks if the filename is valid.
		/// </summary>
		/// <param name="filename">Filename to validate</param>
		/// <returns>Returns a bool whether the name is valid or invalid (true/false)</returns>
		static bool IsValidFilename(string filename)
		{
			char[] invalidChars = Path.GetInvalidFileNameChars();

			return !filename.Any(c => invalidChars.Contains(c));
		}

		/// <summary>
		/// Runs the process of creating and seralizing data.
		/// </summary>
		/// <param name="format">Choosen format for the data</param>
		public static void Run(string format)
		{
			string fileName = ChooseFormatAndFileName(format);
			List<DataRepresentation> data = CreateData();

			formatHandler.WriteData(fileName, data);

			DisplayData(data);

			Console.ReadLine();
		}

		/// <summary>
		/// Creates a list of datarepresentations based on user input.
		/// </summary>
		/// <returns>The list of data representations</returns>
		private static List<DataRepresentation> CreateData()
		{
			List<DataRepresentation> data = new List<DataRepresentation>();

			while (true)
			{
				Console.Write("Category Name to serialize (enter 'q' to quit): ");
				string categoryName = Console.ReadLine();

				if (categoryName == "q")
				{
					break;
				}

				DataRepresentation dataRepresentation = new DataRepresentation();

				DataCategory category = new DataCategory { CategoryName = categoryName };

				while (true)
				{
					Console.Write("Item Name to serialize (enter 'q' to go back to categories): ");
					string itemName = Console.ReadLine();

					if (itemName == "q")
					{
						break;
					}

					DataItem Dataitem = new DataItem();
					DataItem item = new DataItem { ItemName = itemName };

                    while (true)
					{
						Console.Write("Property Name to serialize (enter 'q' to go back to items): ");
						string propertyName = Console.ReadLine();

						if (propertyName == "q")
						{
							break;
						}

						Console.Write($"Property Value for {propertyName}: ");
						string propertyValue = Console.ReadLine();

						item.Properties.Add(new KeyValue { Name = propertyName, Value = propertyValue });
					}

					category.Items.Add(item);
				}

				dataRepresentation.Categories.Add(category);
				data.Add(dataRepresentation);
			}

			return data;
		}

		/// <summary>
		/// Displays the created data to the console.
		/// </summary>
		/// <param name="data">The list of datarepresentations to display</param>
		public static void DisplayData(List<DataRepresentation> data)
		{
			string output = "";

			foreach (DataRepresentation dataRepresentation in data)
			{
				foreach (DataCategory category in dataRepresentation.Categories)
				{
					output += $"\n{category.CategoryName}: \n";

					foreach (DataItem item in category.Items)
					{
						output += $"{tab}{item.ItemName}: \n";

						foreach (KeyValue property in item.Properties)
						{
							output += $"{tab}{tab}{property.Name}: {property.Value}\n";
						}
					}
				}
			}
			Console.WriteLine(output);
		}
	}
}