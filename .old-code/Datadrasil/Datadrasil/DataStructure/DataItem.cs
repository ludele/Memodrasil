namespace Datadrasil
{
	public class DataItem
	{
		/// <summary>
		/// The name of the DataItem
		/// </summary>
		public string ItemName { get; set; }
		/// <summary>
		/// A List of each key name and item value
		/// </summary>
		private List<KeyValue> properties = new List<KeyValue>();
		/// <summary>
		/// Constructor gets/set the dictionary
		/// </summary>
		public List<KeyValue> Properties
		{
			get { return properties; }
			set { properties = value; }
		}

		/// <summary>
		/// Constuctor that makes the DataItem class a list of KeyValue.
		/// </summary>
		public DataItem()
		{
			properties = new List<KeyValue>();
		}
	}
}
