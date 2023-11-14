namespace Datadrasil
{
	/// <summary>
	/// Interface to set a reference for the format handlers,
	/// each format handler has read and write functions.
	/// </summary>
	public interface IFormatHandler<T>
	{
		/// <summary>
		/// Reads data from a file.
		/// </summary>
		/// <param name="filePath">File to be deserialized.</param>
		/// <returns>A list of objects parsed from the data.</returns>
		List<T> ReadData(string filePath);

		/// <summary>
		/// Writes data to a file.
		/// </summary>
		/// <param name="filePath">File to be created or written to.</param>
		/// <param name="data">The list of objects representing the data to be written.</param>
		void WriteData(string filePath, List<T> data);
	}
}
