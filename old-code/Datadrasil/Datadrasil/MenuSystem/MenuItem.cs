namespace Datadrasil
{
	/// <summary>
	/// Represents a menu item in a menu system.
	/// </summary>
	public class MenuItem : MenuComponent
    {
        private readonly Action action;
        private readonly List<MenuComponent> subMenu;

        /// <summary>
        /// Gets a value indicating whether or not the menu item has a submenu.
        /// </summary>
        public bool HasSubMenu => subMenu.Count > 0;

        /// <summary>
        /// Initializes a new instance of the MenuItem class
        /// </summary>
        /// <param name="initDisplayText">The initialized display text</param>
        /// <param name="initAction">The initialized action</param>
        /// <param name="initSubMenu">Optional initialized submenu</param>
        public MenuItem(string initDisplayText, Action? initAction, List<MenuComponent>? initSubMenu = null)
        {
            DisplayText = initDisplayText;
            action = initAction ?? (() => Console.Clear());
            subMenu = initSubMenu ?? new List<MenuComponent>();
        }

        /// <summary>
        /// Executes the action associated with the menu item.
        /// Executes sub menu if it exists.
        /// </summary>
        public override void Execute()
        {
            Console.Clear();
            action();
            Console.WriteLine("");
            if (HasSubMenu)
            {
                Menu subMenuUI = new Menu(subMenu);
                subMenuUI.Execute();
            }
        }
    }
}
