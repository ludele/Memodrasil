
namespace Datadrasil
{
	public class MainMenus
    {
        private static readonly FormatHandlerManager<DataRepresentation> formatHandler = new FormatHandlerManager<DataRepresentation>();
        /// <summary>
        /// A list that returns the main menu, alongside any submenues that that it may include.
        /// </summary>
        /// <returns>Returns the main menu list, of the MenuComponent data type</returns>
        public static List<MenuComponent> Main()
        {

            MenuBuilder initCreateFileMenu = new MenuBuilder("Choose Serializer and Filename");

            string[] formats = { "JSON", "XML", "YAML" };

            // Creates options for every format
            foreach (string format in formats)
            {
                initCreateFileMenu.Add(
                    new MenuBuilder()
                        .SetDisplayText(format)
                        .SetAction(() => { DataCreator.Run(format); new Menu().Execute(); })
                        .Build()
                );
            }

            initCreateFileMenu.Add(new MenuItem("Exit menu", () => { return; }));

            MenuComponent createFilesMenu = initCreateFileMenu.Build();

            MenuBuilder initShowFilesMenu = new MenuBuilder("Choose file to read");
            string[] files = new FileUtility(".xml", ".yaml", ".json").GetFiles();

            // Check if there are any files
            if (files.Length > 0)
            {
                foreach (string file in files)
                {
                    initShowFilesMenu.Add(
                        new MenuBuilder()
                            .SetDisplayText(file)
                            .SetAction(() => DataCreator.DisplayData(formatHandler.ReadData(file)))
                            .Build()
                    );
                }
            }

            initShowFilesMenu.Add(new MenuItem("Exit menu", () => { return; }));

            MenuComponent showFilesMenu = initShowFilesMenu.Build();


            MenuComponent ConfigurationMenu = new MenuBuilder("Configuration options")
                .Add(new MenuItem("Exit menu", () => { return; }))
                .Build();

            // This list is read by the Execute function in the Menu class
            return new List<MenuComponent>
            {
                new MenuItem("Quit", () => Environment.Exit(0)),
                createFilesMenu,
                showFilesMenu,
                new MenuItem("Clear screen", () => Console.Clear()),
            };
        }
    }
}
