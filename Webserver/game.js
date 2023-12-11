// game.js
class Game {
   constructor(narrative) {
     this.narrative = narrative;
     this.currentScene = 'start';
   }
 
   getCurrentScene() {
     return this.narrative[this.currentScene];
   }
 
   chooseOption(optionIndex) {
     const options = this.getCurrentScene().options;
     if (optionIndex >= 0 && optionIndex < options.length) {
       const destination = options[optionIndex].destination;
       this.currentScene = destination;
     } else {
       console.error('Invalid option index.');
     }
   }
 }
 
 module.exports = Game;
 