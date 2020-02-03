const Potions = require('../models/Potions');
const wizardController = require('./wizard.controller');

const damagePercentages = [3, 5, 10, 20, 25];

const case1 = Potions.class({
  "red": 2,
  "blue": 1,
  "green": 1,
});

const case2 = Potions.class({
  "red": 2,
  "blue": 2,
  "green": 1,
  "yellow": 1,
  "grey": 1
});

const case3 = Potions.class({
  "red": 2,
  "blue": 2,
  "green": 2,
  "yellow": 1,
  "grey": 1
});

describe('Testing Wizard Controller', () => {
  describe('calcAttacks', () => {
    it('should calculate best attack', () => {
      expect(wizardController.calcAttacks(case1, damagePercentages)).toEqual({
        attacks: [
          { "quantity": 3, "damage": 10 },
          { "quantity": 1, "damage": 3 }
        ],
        totalDamage: 13
      });

      expect(wizardController.calcAttacks(case2, damagePercentages)).toEqual({
        attacks: [
          { "quantity": 5, "damage": 25 },
          { "quantity": 1, "damage": 3 },
          { "quantity": 1, "damage": 3 }
        ],
        totalDamage: 31
      });
    });
  });
});
