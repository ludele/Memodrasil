namespace Datadrasil
{
	/// <summary>
	/// The menu class which creates the menu system.
	/// Through the hierarchical menu components.
	/// </summary>
	public class Menu : MenuComponent
    {
        private readonly Stack<List<MenuComponent>> menuStack;
        private List<MenuComponent> currentMenu;

        // List of the main menu
        List<MenuComponent> MainMenu = MainMenus.Main();

        /// <summary>
        /// Initalizes a new instance of the menu class
        /// </summary>
        /// <param name="customMenu">An optional parameter allowing the initialization of the menu with a custom set of menu components.</param>
        public Menu(IEnumerable<MenuComponent> customMenu = null)
        {
            currentMenu = customMenu?.ToList() ?? MainMenu;
            menuStack = new Stack<List<MenuComponent>>();
        }
        /// <summary>
        /// Executes the menu system, allowing navigations between menu components.
        /// This allows for a less verbose console interface.
        /// </summary>
        public override void Execute()
        {
            while (true)
            {
                ShowMenu();
                string userInput = Console.ReadLine();

                if (int.TryParse(userInput, out int index) && index >= 1 && index <= currentMenu.Count)
                {
                    MenuComponent selectedMenuComponent = currentMenu[index - 1];
                    selectedMenuComponent.Execute();

                    if (selectedMenuComponent is MenuItem menuItem && menuItem.HasSubMenu)
                    {
                        menuStack.Push(currentMenu);
                        DisplayText = menuItem.GetSubMenu().FirstOrDefault()?.DisplayText ?? "Main MainMenus";
                    }
                    else
                    {
                        if (menuStack.Count > 0)
                        {
                            currentMenu = menuStack.Pop();
                            DisplayText = currentMenu.LastOrDefault()?.DisplayText ?? "Main MainMenus";
                        }
                        else
                        {
                            currentMenu = MainMenu;
                            DisplayText = "Main menu";
                        }
                    }
                }
                else
                {
                    Console.Clear();
                    Console.WriteLine("Invalid option. Please try again.");
                }
            }
        }

        /// <summary>
        /// Displays the current menu options to standard output.
        /// </summary>
        private void ShowMenu()
        {
            for (int i = 0; i < currentMenu.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {currentMenu[i].DisplayText}");
            }

            Console.Write("Select an option: ");
        }
    }
}
