class MenuItem {
   constructor(text, action, subMenu) {
      this.text = text;
      this.action = action;
      this.subMenu = subMenu || [];
   }

   execute() {
      this.action();
      if (this.subMenu.length > 0) {
         const subMenu = new Menu(this.subMenu);
         subMenu.execute();
      }
   }
}

class Menu {
   constructor(menuItems) {
      this.menuItems = menuItems.map((item) => new MenuItem(item.text, item.action, item.subMenu));
   }

   execute() {
      this.showMenu();
      const userInput = prompt("Select an option:");
      const index = parseInt(userInput);
      const selectedMenuItem = this.menuItems[index - 1];

      if (selectedMenuItem) {
         selectedMenuItem.execute();
      } else {
         console.log("Invalid option. Please try again.");
         this.execute();
      }
   }

   showMenu() {
      this.menuItems.forEach((item, index) => {
         console.log(`${index + 1}. ${item.text}`);
      });
   }
}

function buildMenuFromJson(jsonConfig) {
   return new Menu(jsonConfig);
}
