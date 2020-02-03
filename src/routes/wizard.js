const Potions = require('../models/Potions');
const wizardController = require('../controllers/wizard.controller');
const damagePercentages = require('../models/enums.js').damagePercentages;


/**
 * Ruta: atacar al brujo
 */
exports.attack = function(req, res, next) {
    const potions = req.body;
    const attacks = wizardController.calcAttacks(Potions.class(potions), damagePercentages);
    res.json(attacks);
};
