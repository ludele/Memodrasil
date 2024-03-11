
namespace Datadrasil
{
	/// <summary>
	/// Builder class to create menus.
	/// </summary>
	public class MenuBuilder
    {
        private string displayText { get; set; }
        private Action action;
        private List<MenuComponent> option;

        /// <summary>
        /// Constuctor to set the display text.
        /// </summary>
        /// <param name="initDisplayText">Optional initialation of the display text</param>
        public MenuBuilder(string initDisplayText = null)
        {
            displayText = initDisplayText;
        }

        /// <summary>
        /// Sets the display text for the menu component being built. 
        /// </summary>
        /// <param name="text">The display text</param>
        /// <returns>The current instance of the MenuBuilder</returns>
        public MenuBuilder SetDisplayText(string text)
        {
            displayText = text;
            return this;
        }

        /// <summary>
        /// Sets the action to be executed when the menu component is selected.
        /// </summary>
        /// <param name="menuAction">The action to be executed</param>
        /// <returns>The current instance of the MenuBuilder</returns>
        public MenuBuilder SetAction(Action menuAction)
        {
            action = menuAction;
            return this;
        }

        /// <summary>
        /// Adds a option/submenu to the menu. 
        /// </summary>
        /// <param name="option">The option/submenu to be added</param>
        /// <returns>The current instance of the MenuBuilder</returns>
        public MenuBuilder Add(MenuComponent option)
        {
            this.option ??= new List<MenuComponent>();
            this.option.Add(option);
            return this;
        }

        /// <summary>
        /// Builds the menu.
        /// </summary>
        /// <returns></returns>
		public MenuComponent Build()
        {
            return new MenuItem(displayText, action, option);
        }
    }
}
