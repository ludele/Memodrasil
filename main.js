"use strict";

// Import modules to streamline the project
const fs = require('fs');
const Ajv = require('ajv'); // ajv used for json schema

const dataFilePath = 'save-file.json';
const schema = require('./schema.json'); // Replace with the actual path to your schema file

if (!fs.existsSync(dataFilePath)) {
    const emptyData = {};
    fs.writeFileSync(dataFilePath, JSON.stringify(emptyData), 'utf-8');
}

const ajv = new Ajv();

// Function to read and parse JSON data
function readData() {
    try {
        const dataFileContent = fs.readFileSync(dataFilePath, 'utf-8');

        // check if the file is empty or data doesn't match the schema
        if (!dataFileContent || !ajv.validate(schema, JSON.parse(dataFileContent))) {
            return {}; // return an empty object if the file is empty or data is invalid
        }

        const data = JSON.parse(dataFileContent);
        return data;
    } catch (error) {
        console.error('Error reading or parsing data:', error);
        throw error;
    }
}

// this function writes the json data the, user submitted.
function writeData(data) {
    try {
        const formattedData = JSON.stringify(data, null, 4); // 4 spaces for indentation
        fs.writeFileSync(dataFilePath, formattedData, 'utf-8');
    } catch (error) {
        console.error('Error writing data:', error);
        throw error;
    }
}

// Views the json file, will be modified later to show a more human readable output
function viewData() {
    const data = readData();
    return data;
}

// function to add data to a specified category
function addData(category, variableName, variableValue, dataType) {
    const data = readData();

    if (!data[category]) {
        data[category] = {};
    }

    if (data[category][variableName]) {
        // Handle conditions for adding values with the same name based on data type
        console.log('Category and variable name already exist. Updating value.');
        data[category][variableName].value = variableValue;
    } else {
        // Add data to the specified category
        data[category][variableName] = { value: variableValue };
    }

    // write the updated data back to the file
    writeData(data);

    return 'Data added';
}

module.exports = { viewData, addData };
