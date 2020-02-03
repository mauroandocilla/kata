const _ = require('lodash');

/**
 * Potions Model
 */
class Potions {
  constructor(obj) {
    if (!_.isEmpty(obj.red) || !_.isEmpty(obj.blue) ||
      !_.isEmpty(obj.green) || !_.isEmpty(obj.yellow) ||
      !_.isEmpty(obj.grey)) {
      if (typeof obj.red !== 'number' || typeof obj.blue !== 'number' ||
        typeof obj.green !== 'number' || typeof obj.yellow !== 'number' ||
        typeof obj.grey !== 'number') {
        throw new Error('Invalid Argument');
      }
    }

    this.red = obj.red || 0;
    this.blue = obj.blue || 0;
    this.green = obj.green || 0;
    this.yellow = obj.yellow || 0;
    this.grey = obj.grey || 0;
  }

  static class(obj) {
    return new Potions(obj);
  }
}

module.exports = Potions;
