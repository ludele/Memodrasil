namespace Datadrasil
{
	/// <summary>
	/// The next highest structure that holds the other smaller structures inside a category.
	/// </summary>
	public class DataCategory
    {
        /// <summary>
        /// The name of the category
        /// </summary>
        public string CategoryName { get; set; }
        /// <summary>
        /// The list of items within the category
        /// </summary>
        private List<DataItem> items = new List<DataItem>();

        /// <summary>
        /// Gets/sets the list of the items in the category
        /// </summary>
		public List<DataItem> Items 
		{
			get { return items; }
			set { items = value; }
		}

		/// <summary>
		/// Constuctor that makes the DataCategory class a list of DataItem.
		/// </summary>
		public DataCategory()
        {
            items = new List<DataItem>();
        }
    }
}
