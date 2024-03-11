class Character {
   constructor(name, initialAttributes = {}) {
     this.name = name;
     this.attributes = { ...initialAttributes };
   }
 
   changeAttribute(attribute, value) {
     if (this.attributes.hasOwnProperty(attribute)) {
       this.attributes[attribute] += value;
     } else {
       console.warn(`Attribute '${attribute}' does not exist for ${this.name}.`);
     }
   }
 
   setAttribute(attribute, value) {
     if (this.attributes.hasOwnProperty(attribute)) {
       this.attributes[attribute] = value;
     } else {
       console.warn(`Attribute '${attribute}' does not exist for ${this.name}.`);
     }
   }
 
   getAttribute(attribute) {
     return this.attributes[attribute];
   }
 }
 
 module.exports = Character;