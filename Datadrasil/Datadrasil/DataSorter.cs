namespace Datadrasil
{
	/// <summary>
	/// Class responsible for sorting data within a DataRepresentation.
	/// </summary>
	public class DataSorter
	{
		private DataRepresentation dataRepresentation;

		/// <summary>
		/// Initalizes a new instance of the DataSorter class.
		/// </summary>
		/// <param name="initData">The data to be sorted</param>
		public DataSorter(DataRepresentation initData)
		{
			dataRepresentation = initData;
		}

		/// <summary>
		/// Sorts the data within the DataRepresentation based on the options.
		/// </summary>
		/// <param name="sortingKey">Flag for to check which key the methods should sort</param>
		/// <param name="isNumericKey">Flag for if the the value of the key is numeric</param>
		/// <param name="isAscending">Flag for ascending or descending sorting order</param>
		/// <returns></returns>
		public DataRepresentation SortData(string sortingKey, bool isNumericKey, bool isAscending)
		{
			DataRepresentation sortedDataRepresentation = new DataRepresentation();

			foreach (DataCategory category in dataRepresentation.Categories)
			{
				List<DataItem> sortedItems;

				if (isNumericKey)
				{
					sortedItems = isAscending
						? category.Items.OrderBy(item => Convert.ToDouble(item.Properties.FirstOrDefault(kvp => kvp.Name == sortingKey)?.Value)).ToList()
						: category.Items.OrderByDescending(item => Convert.ToDouble(item.Properties.FirstOrDefault(kvp => kvp.Name == sortingKey)?.Value)).ToList();
				}
				else
				{
					sortedItems = isAscending
						? category.Items.OrderBy(item => item.Properties.FirstOrDefault(kvp => kvp.Name == sortingKey)?.Value?.ToString()).ToList()
						: category.Items.OrderByDescending(item => item.Properties.FirstOrDefault(kvp => kvp.Name == sortingKey)?.Value?.ToString()).ToList();
				}

				// add sorted items to the new DataRepresentation instance
				sortedDataRepresentation.Categories.Add(new DataCategory { CategoryName = category.CategoryName, Items = sortedItems });
			}

			return sortedDataRepresentation;
		}
	}
}
