// game.js

const { error } = require('console');
const vm = require('vm');


class Game {
  /**
 * Constructor for the Game class.
 * @param {Object} narrative - the narrative object containing scenes and options.
 */
  constructor(narrative) {
    try {
      if (!narrative || typeof narrative !== "object") {
        throw new Error("Invalid format, expecting object");
      }

      this.narrative = Object.entries(narrative).map(([id, scene]) => ({ id, ...scene }));
      this.currentScene = 'start';
      this.player = {};
      this.dynamicValues = {};
    } catch (error) {
      console.error(`Error in Game constructor: ${error.message}`);
    }
  }
  /**
    * Sets the player's name.
    * @param {string} name - The player's name.
    */
  setPlayerName(name) {
    try {
      this.player.name = name;
    } catch (error) {
      console.error(`Error in setPlayerName: ${error.message}`);
    }
  }

  /**
  * Sets the player's stats.
  * @param {Object} stats - The player's stats.
  */
  setPlayerStats(stats) {
    try {
      this.player.stats = stats;
    } catch (error) {
      console.error(`Error in setPlayerStats: ${error.message}`);
    }
  }

  /**
  * Sets a dynamic value.
  * @param {string} key - The key for the dynamic value.
  * @param {any} value - The value to be set.
  */
  setDynamicValue(key, value) {
    try {
      this.dynamicValues[key] = value;
    } catch (error) {
      console.error(`Error in setDynamicValue: ${error.message}`);
    }
  }

  /**
  * Gets the current scene.
  * @returns {Object} The current scene object.
  */
  getCurrentScene() {
    try {
      const currentScene = this.narrative.find(scene => scene.id === this.currentScene);
      return this.resolveDynamicLinks(currentScene);
    } catch (error) {
      console.error(`Error in getCurrentScene: ${error.message}`);
    }
  }


  /**
   * Chooses an option from the current scene.
   * @param {number} optionIndex - The index of the chosen option.
   */
  chooseOption(optionIndex) {
    try {
      const currentScene = this.getCurrentScene();

      if (!currentScene) {
        console.error('Current scene is undefined. Make sure the currentScene is set correctly.');
        return;
      }

      const options = currentScene.options;

      if (options && Array.isArray(options) && optionIndex >= 0 && optionIndex < options.length) {
        const chosenOption = options[optionIndex];

        if (chosenOption && chosenOption.condition && !this.evaluateCondition(chosenOption.condition)) {
          console.log("Condition not met. Choose another option.");
          return;
        }

        if (chosenOption && chosenOption.action) {
          this.executeAction(chosenOption.action);
        }

        this.currentScene = chosenOption.destination;
      } else {
        console.error('Invalid option index or options are not defined for the current scene.');
      }
    } catch (error) {
      console.error(`Error in chooseOption: ${error.message}`);
    }
  }

  /**
  * Evaluates a condition using the player's stats and dynamic values.
  * @param {string} condition - The condition to evaluate.
  * @returns {boolean} The result of the condition evaluation.
  */
  evaluateCondition(condition) {
    try {
      const context = { player: this.player, dynamicValues: this.dynamicValues };
      const script = new vm.Script(condition);
      return script.runInNewContext(context);
    } catch (error) {
      console.error(`Error in evaluateCondition: ${error.message}`);
    }
  }

  /**
  * Executes an action script.
  * @param {string} action - The action script to execute.
  */
  executeAction(action) {
    try {
      const context = { player: this.player, dynamicValues: this.dynamicValues };
      const script = new vm.Script(action);
      script.runInNewContext(context);
    } catch (error) {
      console.error(`Error in executeAction: ${error.message}`);
    }
  }

  /**
  * Resolves dynamic links in a scene.
  * @param {Object} scene - The scene object.
  * @returns {Object} The scene object with resolved dynamic links.
  */
  resolveDynamicLinks(scene) {
    try {
      if (scene && scene.dynamicLink) {
        const dynamicDestination = this.calculateDynamicDestination(scene.dynamicLink);
        scene.options[0].destination = dynamicDestination;
      }
      return scene;
    } catch (error) {
      console.error(`Error in resolveDynamicLinks: ${error.message}`);
    }
  }

  /**
  * Calculates the dynamic destination for a link.
  * @param {string} dynamicLink - The dynamic link key.
  * @returns {string} The calculated destination.
  */
  calculateDynamicDestination(dynamicLink) {
    try {
      return this.dynamicValues[dynamicLink] || 'defaultDestination';
    } catch (error) {
      console.error(`Error in calculateDynamicDestination: ${error.message}`);
    }
  }

  /**
  * Replaces dynamic variables in a text string.
  * @param {string} text - The text with dynamic variables.
  * @returns {string} The text with replaced dynamic variables.
  */
  replaceDynamicVariables(text) {
    try {
      return text.replace(/{player.name}/g, this.player.name);
    } catch (error) {
      console.error(`Error in replaceDynamicVariables: ${error.message}`);
    }
  }

  /**
  * Displays the current scene in the console.
  */
  displayCurrentScene() {
    try {
      const currentScene = this.getCurrentScene();
      const displayText = this.replaceDynamicVariables(currentScene.text);
      console.log(displayText);

      if (currentScene.options && currentScene.options.length > 0) {
        console.log("Options:");
        currentScene.options.forEach((option, index) => {
          console.log(`${index + 1}. ${this.replaceDynamicVariables(option.text)}`);
        });
      }
    } catch (error) {
      console.error(`Error in displayCurrentScene: ${error.message}`);
    }
  }

  /**
 * Loads a game from a YAML string.
 * @param {string} yamlString - The YAML string representing the game.
 */
  loadGameFromYaml(yamlString) {
    try {
      const parsedData = yaml.load(yamlString);

      this.narrative = Object.entries(parsedData).map(([id, scene]) => ({ id, ...scene }));
      this.currentScene = 'start';
      this.player = {};
      this.dynamicValues = {};
    } catch (error) {
      console.error(`Error in loadGameFromYaml: ${error.message}`);
    }
  }
}

module.exports = Game;