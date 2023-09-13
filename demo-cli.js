"use strict";

const readline = require('readline');
const { viewData, addData } = require('./main');

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
    rl.question('Select an option: ', (choice) => {
        switch (choice) {
            case '1':
                console.log('Your Data:');
                console.log(JSON.stringify(viewData(), null, 4));
	            mainMenu();
                break;
            case '2':
                //addCustomPrompts(); ?
                break;
	        case '3':
	            //addDataToPrompts(); ?
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

console.log('Welcome to Memodrasil');
mainMenu();
