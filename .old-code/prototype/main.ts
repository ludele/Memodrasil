"use strict";

// Import modules to streamline the project

import * as fs from 'fs';
import Ajv from 'ajv';

const dataFilePath: string = 'save-file.json';
let schema = require('./schema.json'); 

if (!fs.existsSync(dataFilePath)) {
 const emptyData = {};
 fs.writeFileSync(dataFilePath, JSON.stringify(emptyData), 'utf-8');
}

const ajv = new Ajv();

function readData() {
 try {
  const dataFileContent = fs.readFileSync(dataFilePath, 'utf-8');
  
  if (!dataFileContent || !ajv.validate(schema, JSON.parse(dataFileContent))) {
   return {}; 
  }
  
  const data = JSON.parse(dataFileContent);
  return data;
 } catch (error) {
  console.error('Error reading or parsing data:', error);
  throw error;
 }
}

function writeData(data: string) {
 try {
  const formattedData = JSON.stringify(data, null, 4); 
  fs.writeFileSync(dataFilePath, formattedData, 'utf-8');
 } catch (error) {
  console.error('Error writing data:', error);
  throw error;
 }
}

export function viewData() {
 const data = readData();
 return data;
}

// function to add data to a specified category
export function addData(category: string, variableName: string, variableValue: string) {
 const data = readData();
 
 if (!data[category]) {
  data[category] = {};
 }
 
 if (data[category][variableName]) {
  console.log('Category and variable name already exist. Updating value.');
  data[category][variableName].value = variableValue;
 } else {
  data[category][variableName] = { value: variableValue };
 }
 
 writeData(data);
 
 return 'Data added';
}

module.exports = { viewData, addData };
