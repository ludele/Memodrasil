import * as readline from 'readline';

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
 });

async function prompt(question: string): Promise<string> {
   return new Promise((resolve) => {
     rl.question(question, (answer) => {
       resolve(answer);
     });
   });
 }

async function test(){

   const category = await prompt('Enter the category/subcategory: ');
   const variableName = await prompt('Enter the custom variable name: ');
   const variableValue = await prompt('Enter the value: ');
 
   const result = addData(category, variableName, variableValue);
   console.log(result);

}