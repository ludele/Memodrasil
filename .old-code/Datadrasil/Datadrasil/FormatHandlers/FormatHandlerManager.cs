namespace Datadrasil
{
	/// <summary>
	/// Manages format handlers for reading and writing data of type T from/to files.
	/// </summary>
	public class FormatHandlerManager<T>
	{
		private readonly Dictionary<string, IFormatHandler<T>> formatHandlers;

		/// <summary>
		/// Initializes a new instance of the FormatHandlerManager class,
		/// creating links between format names and format handlers.
		/// </summary>
		public FormatHandlerManager()
		{
			formatHandlers = new Dictionary<string, IFormatHandler<T>>
			{
				{ ".json", new JSONFormatHandler<T>() },
				{ ".xml", new XMLFormatHandler<T>() },
				{ ".yaml", new YAMLFormatHandler<T>() },
			};
		}

		/// <summary>
		/// Reads data from a file based on its extension.
		/// </summary>
		/// <param name="filePath">The path of the file to read.</param>
		/// <returns>A list of objects representing the data read by the format handler.</returns>
		/// <exception cref="NotSupportedException">Thrown if the file format is not supported.</exception>
		public List<T> ReadData(string filePath)
		{
			string fileExtension = Path.GetExtension(filePath);

			if (formatHandlers.TryGetValue(fileExtension, out IFormatHandler<T>? handler))
			{
				return handler.ReadData(filePath);
			}
			else
			{
				throw new NotSupportedException($"File format {fileExtension} is not supported.");
			}
		}

		/// <summary>
		/// Writes data to a file based on its extension.
		/// </summary>
		/// <param name="filePath">The path of the file to write the data to.</param>
		/// <param name="data">The list of objects representing the data to be written.</param>
		/// <exception cref="NotSupportedException">Thrown if the file format is not supported.</exception>
		public void WriteData(string filePath, List<T> data)
		{
			string fileExtension = Path.GetExtension(filePath);

			if (formatHandlers.TryGetValue(fileExtension, out IFormatHandler<T> handler))
			{
				handler.WriteData(filePath, data);
			}
			else
			{
				throw new NotSupportedException($"File format {fileExtension} is not supported.");
			}
		}
	}
}
