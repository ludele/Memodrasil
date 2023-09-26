"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addData = exports.viewData = void 0;
// Import modules to streamline the project
const fs = __importStar(require("fs"));
const ajv_1 = __importDefault(require("ajv"));
const dataFilePath = 'save-file.json';
let schema = require('./schema.json'); // Replace with the actual path to your schema file
if (!fs.existsSync(dataFilePath)) {
    const emptyData = {};
    fs.writeFileSync(dataFilePath, JSON.stringify(emptyData), 'utf-8');
}
const ajv = new ajv_1.default();
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
    }
    catch (error) {
        console.error('Error reading or parsing data:', error);
        throw error;
    }
}
// this function writes the json data the, user submitted.
function writeData(data) {
    try {
        const formattedData = JSON.stringify(data, null, 4); // 4 spaces for indentation
        fs.writeFileSync(dataFilePath, formattedData, 'utf-8');
    }
    catch (error) {
        console.error('Error writing data:', error);
        throw error;
    }
}
// Views the json file, will be modified later to show a more human readable output
function viewData() {
    const data = readData();
    return data;
}
exports.viewData = viewData;
// function to add data to a specified category
function addData(category, variableName, variableValue) {
    const data = readData();
    if (!data[category]) {
        data[category] = {};
    }
    if (data[category][variableName]) {
        // Handle conditions for adding values with the same name based on data type
        console.log('Category and variable name already exist. Updating value.');
        data[category][variableName].value = variableValue;
    }
    else {
        // Add data to the specified category
        data[category][variableName] = { value: variableValue };
    }
    // write the updated data back to the file
    writeData(data);
    return 'Data added';
}
exports.addData = addData;
module.exports = { viewData, addData };
//# sourceMappingURL=main.js.map