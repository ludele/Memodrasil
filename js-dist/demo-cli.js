"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require('readline');
const main_1 = require("./main");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function displayMenu() {
    console.log('Data Organization Menu:');
    console.log('1. View Data');
    console.log('2. Add Custom values');
    console.log('3. Add to existing categories');
    console.log('4. Exit');
}
function mainMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        displayMenu();
        rl.question('Select an option: ', (choice) => {
            switch (choice) {
                case '1':
                    console.log('Your Data:');
                    console.log(JSON.stringify((0, main_1.viewData)(), null, 4));
                    mainMenu();
                    break;
                case '2':
                    addCustomPrompts();
                    break;
                case '3':
                    addDataToPrompts();
                    break;
                case '4':
                    rl.close();
                    break;
                default:
                    console.log('Invalid choice. Please try again.');
                    mainMenu();
                    break;
            }
        });
    });
}
function addDataToPrompts() {
    return __awaiter(this, void 0, void 0, function* () {
        // Retrieve existing data
        const existingData = (0, main_1.viewData)();
        // List existing categories
        const categories = Object.keys(existingData);
        // Display available categories
        console.log('Available Categories:');
        categories.forEach((category, index) => {
            console.log(`${index + 1}. ${category}`);
        });
        rl.question('Select a category to add information to (or type "cancel" to go back): ', (selectedCategory) => {
            if (selectedCategory.toLowerCase() === 'cancel') {
                mainMenu(); // Go back to the main menu if the user cancels
            }
            else {
                const selectedCategoryIndex = parseInt(selectedCategory) - 1;
                if (selectedCategoryIndex >= 0 && selectedCategoryIndex < categories.length) {
                    const category = categories[selectedCategoryIndex];
                    rl.question('Enter the custom variable name: ', (variableName) => {
                        rl.question('Enter the value: ', (variableValue) => {
                            // Pass user inputs to the addData function in main.js
                            const result = (0, main_1.addData)(category, variableName, variableValue);
                            console.log(result);
                            mainMenu();
                        });
                    });
                }
                else {
                    console.log('Invalid selection. Please select a valid category.');
                    addDataToPrompts();
                }
            }
        });
    });
}
function addCustomPrompts() {
    return __awaiter(this, void 0, void 0, function* () {
        // Retrieve existing data
        const existingData = (0, main_1.viewData)();
        // List existing categories
        const categories = Object.keys(existingData);
        rl.question('Enter the category/subcategory: ', (category) => {
            // Check if the entered category exists
            if (categories.includes(category)) {
                console.log('Category already exists. Data not added/updated.');
                mainMenu();
            }
            else {
                rl.question('Enter the custom variable name: ', (variableName) => {
                    rl.question('Enter the value: ', (variableValue) => {
                        // Pass user inputs to the addData function in main.js
                        const result = (0, main_1.addData)(category, variableName, variableValue);
                        console.log(result);
                        mainMenu();
                    });
                });
            }
        });
    });
}
console.log('Welcome to Memodrasil');
mainMenu();
//# sourceMappingURL=demo-cli.js.map