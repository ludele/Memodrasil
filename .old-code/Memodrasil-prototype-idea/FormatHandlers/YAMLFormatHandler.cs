using YamlDotNet.Serialization;

namespace Datadrasil
{
	/// <summary>
	/// Handles YAML format for data of type T.
	/// </summary>
	internal class YAMLFormatHandler<T> : IFormatHandler<T>
	{
		/// <inheritdoc/>
		public List<T> ReadData(string filePath)
		{
			try
			{
				using (FileStream stream = new FileStream(filePath, FileMode.Open))
				{
					Deserializer deserializer = new Deserializer();
					List<T> yamlObject = deserializer.Deserialize<List<T>>(new StreamReader(stream));
					return yamlObject ?? new List<T>();
				}
			}
			catch (Exception ex)
			{
				throw new InvalidOperationException("Error occurred during YAML deserialization.", ex);
			}
		}

		/// <inheritdoc/>
		public void WriteData(string filePath, List<T> data)
		{
			ISerializer serializer = new SerializerBuilder().Build();
			string yamlData = serializer.Serialize(data);

			File.WriteAllText(filePath, yamlData);
		}
	}
}
