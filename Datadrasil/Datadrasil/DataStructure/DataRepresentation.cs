namespace Datadrasil
{
	/// <summary>
	/// The main structure holding all the others.
	/// </summary>
	public class DataRepresentation
	{
		/// <summary>
		/// List of Datacategories, which also includes a list of data items.
		/// </summary>
		private List<DataCategory> categories = new List<DataCategory>();

		/// <summary>
		/// Constructor gets/sets the category
		/// </summary>
		public List<DataCategory> Categories
		{
			get { return categories; }
			set { categories = value; }
		}

		/// <summary>
		/// Constuctor that makes the DataRepresentation class a list of DataCategories
		/// </summary>
		public DataRepresentation()
		{
			categories = new List<DataCategory>();
		}
	}
}
