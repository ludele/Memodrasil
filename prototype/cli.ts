"use strict";

import * as readline from 'readline';

import { viewData, addData } from './main';

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

async function mainMenu() {
 displayMenu();
 rl.question('Select an option: ', (choice: string) => {
  switch (choice) {
   case '1':
    console.log('Your Data:');
    console.log(JSON.stringify(viewData(), null, 4));
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
}

async function addDataToPrompts() {
 const existingData = viewData();
 const categories = Object.keys(existingData);
 
 console.log('Available Categories:');
 categories.forEach((category, index) => {
  console.log(`${index + 1}. ${category}`);
 });
 
 rl.question('Select a category to add information to (or type "cancel" to go back): ', (selectedCategory : string) => {
   if (selectedCategory.toLowerCase() === 'cancel') {
    mainMenu(); 
   } else {
    const selectedCategoryIndex = parseInt(selectedCategory) - 1;
    if (selectedCategoryIndex >= 0 && selectedCategoryIndex < categories.length) {
     
     const category = categories[selectedCategoryIndex];
     
     rl.question('Enter the custom variable name: ', (variableName : string) => {
      rl.question('Enter the value: ', (variableValue : string) => {
              
       const result = addData(category, variableName, variableValue);
       console.log(result);
       mainMenu();
      });
     });
     
    } else {
     console.log('Invalid selection. Please select a valid category.');
     addDataToPrompts();
    }
   }
  });
}

async function addCustomPrompts() {
 const existingData = viewData();
 const categories = Object.keys(existingData);
 
 rl.question('Enter the category/subcategory: ', (category : string) => {
  if (categories.includes(category)) {
   console.log('Category already exists. Data not added/updated.');
   mainMenu();
  } else {
   rl.question('Enter the custom variable name: ', (variableName : string) => {
    rl.question('Enter the value: ', (variableValue : string) => {
     const result = addData(category, variableName, variableValue);
     console.log(result);
     mainMenu();
    });
   });
  }
 });
}

console.log('Welcome to Memodrasil');
mainMenu();
