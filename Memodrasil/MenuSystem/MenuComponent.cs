namespace Datadrasil
{
	/// <summary>
	/// Represents a part of the menu system, providing a common interface for menu items and submenus.
	/// </summary>
	public abstract class MenuComponent
    {
        /// <summary>
        /// Sets/gets the display text for the menu component
        /// </summary>
        public string DisplayText { get; protected set; }


        /// <summary>
        /// Gets the submenu associated with the menu component
        /// </summary>
        /// <returns>A list of menu components representing the submenu</returns>
        public virtual List<MenuComponent> GetSubMenu() => new List<MenuComponent>();

        /// <summary>
        /// Executes the action associated with the menu component.
        /// </summary>
        public abstract void Execute();
    }
}
