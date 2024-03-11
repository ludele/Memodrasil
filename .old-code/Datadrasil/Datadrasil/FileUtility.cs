namespace Datadrasil
{
	/// <summary>
	/// Class containing methods for creating lists of files.
	/// </summary>
	public class FileUtility
	{
		private readonly string[] allowedExtensions;

		/// <summary>
		/// Initalizes the serializedFiles class
		/// </summary>
		/// <param name="allowedExtensions">Parameters regarding which file extensions to search for</param>
		public FileUtility(params string[] allowedExtensions)
		{
			this.allowedExtensions = allowedExtensions;
		}

		/// <summary>
		/// Lists files with the allowed extensions in the running directory.
		/// </summary>
		/// <returns>A string array of filepaths</returns>
		public string[] ListFiles()
		{
			string directory = Directory.GetCurrentDirectory();
			string[] files = Directory.GetFiles(directory);

			string[] filteredFiles = files
				.Where(file =>
					allowedExtensions.Any(ext => file.EndsWith(ext, StringComparison.OrdinalIgnoreCase)) &&
					!file.EndsWith("deps.json", StringComparison.OrdinalIgnoreCase) &&
					!file.EndsWith("runtimeconfig.json", StringComparison.OrdinalIgnoreCase))
				.ToArray();

			return filteredFiles;
		}

		/// <summary>
		/// Gets all the file names, in the array created in ListFiles
		/// </summary>
		public string[] GetFiles()
		{
			List<string> fileNames = new List<string>();
			string[] files = ListFiles();

            foreach (string file in files)
			{
				string fileName = Path.GetFileName(file);
				fileNames.Add(fileName);
			}

			return fileNames.ToArray();
		}

		public void PrintFiles()
		{
			foreach(var files in GetFiles())
			{
                Console.WriteLine(files);
            }
		}
	}
}
