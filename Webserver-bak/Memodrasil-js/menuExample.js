const dynamicMenu = buildMenuFromJson([
   {
      "text": "Dynamic Menu",
      "subMenu": [
         {
            "text": "Dynamic Option 1",
            "action": () => console.log("Dynamic Option 1 selected")
         },
         {
            "text": "Dynamic Option 2",
            "action": () => console.log("Dynamic Option 2 selected")
         }
      ]
   },
   {
      "text": "Exit",
      "action": () => console.log("Exiting dynamic menu")
   }
]);

const initialMenu = new Menu([dynamicMenu]);
initialMenu.execute();
