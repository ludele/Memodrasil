using Newtonsoft.Json;

namespace Datadrasil
{
	/// <summary>
	/// Handles JSON format for data of type T.
	/// </summary>
	public class JSONFormatHandler<T> : IFormatHandler<T>
	{
		/// <inheritdoc/>
		public List<T> ReadData(string filePath)
		{
			string jsonContent = File.ReadAllText(filePath);

			List<T> parsedData = JsonConvert.DeserializeObject<List<T>>(jsonContent);
			return parsedData ?? new List<T>();
		}

		/// <inheritdoc/>
		public void WriteData(string filePath, List<T> data)
		{
			string jsonData = JsonConvert.SerializeObject(data);
			File.WriteAllText(filePath, jsonData);
		}
	}
}
