import * as readline from 'readline';

const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

rl.question('Enter the value: ', (variableName : string) => {
   rl.question('Enter the value: ', (variableValue : string) => {
      rl.question('Enter the value: ', (variableValue : string) => {
         rl.question('Enter the value: ', (variableValue : string) => {
            rl.question('Enter the value: ', (variableValue : string) => {
               rl.question('Enter the value: ', (variableValue : string) => {
                  rl.question('Enter the value: ', (variableValue : string) => {
                     rl.question('Enter the value: ', (variableValue : string) => {
                     });
                  });
               });
            });
         });
      });
   });
});