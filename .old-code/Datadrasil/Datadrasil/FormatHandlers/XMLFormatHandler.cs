using System.Xml.Serialization;

namespace Datadrasil
{
	/// <summary>
	/// Handles XML format for data of type T.
	/// </summary>
	public class XMLFormatHandler<T> : IFormatHandler<T>
	{
		/// <inheritdoc/>
		public List<T> ReadData(string filePath)
		{
			if (!File.Exists(filePath))
			{
				return new List<T>();
			}
			try
			{
				using FileStream stream = new(filePath, FileMode.Open);
				XmlSerializer serializer = new(typeof(List<T>));
				return (List<T>)serializer.Deserialize(stream);
			}
			catch (Exception ex)
			{
				throw new InvalidOperationException("Error occurred during XML deserialization.", ex);
			}
		}

		/// <inheritdoc/>
		public void WriteData(string filePath, List<T> data)
		{
			if (data == null || data.Count == 0)
			{
				return;
			}

			using (var writer = new StreamWriter(filePath))
			{
				XmlSerializer serializer = new XmlSerializer(typeof(List<T>));
				serializer.Serialize(writer, data);
			}
		}
	}
}
