const _ = require('lodash');
const Potions = require('../models/Potions');

/**
 * Calcular los ataque del brujo
 */
exports.calcAttacks = function (potions, damagePercentages) {
  const objPotions = Potions.class(potions);

  const usePotions = getUseOfPotions([
    objPotions.red,
    objPotions.blue,
    objPotions.green,
    objPotions.yellow,
    objPotions.grey
  ]);

  const attacks = _.concat(..._.map(usePotions, (usePotion) => {
    const totalPotions = _.sum(usePotion);
    const attackCombinations = getAttackCombinations(totalPotions);
    return getMaxAttacksDamage(attackCombinations, damagePercentages);
  }));

  return {
    attacks: attacks,
    totalDamage: _.sumBy(attacks, 'damage')
  };
}

/**
 * Obtener las veces que el que el brujo podria usar una mezcla de pociones de distinto color
 * @param {Array} potions pociones a disposición del brujo
 * @param {Number} mixes mezclas por cada ataque
 * @example
 *
 * // Pociones a disposición del brujo:
 * //   [2, 2, 2, 1, 1]: 2 rojas, 2 azules, 2 verdes, 1 amarilla , 1 gris
 * // Resultado:
 * //   La primera vez puede mezclar [1, 1, 1, 1, 1] una poción de cada color,
 * //   La segunda vez puede mezclar [1, 1, 1, 0, 0] el resto de pociones que le quedan,
 *
 * getUseOfPotions([ 2, 2, 2, 1, 1 ]);
 * // => [[ 1, 1, 1, 1, 1 ], [ 1, 1, 1, 0, 0 ]]
 */
function getUseOfPotions(potions, mixes = []) {
  if (_.sum(potions)) {
    const leaveOnePotion = _.map(potions, (n) => n > 0 ? 1 : 0);

    mixes.push(leaveOnePotion);
    const removeOnePotion = _.map(potions, (n) => n - 1 >= 0 ? n - 1 : 0);
    return getUseOfPotions(removeOnePotion, mixes);
  }

  return mixes;
}

/**
 * Obtener todos las posibles combinaciones de ataques
 * @param {Number} totalPotions Total de pociones
 * @param {Number} start Posición de inicio
 * @param {Array} combination Combinación
 * @param {Array} combinations Combinaciones
 * @example
 *
 * // Pociones a disposición del brujo: 5
 * // Combinaciones de ataques resultantes:
 * //   1. [ 1, 1, 1, 1, 1 ] -> 5 ataques con una sola poción cada vez
 * //   2. [ 1, 1, 1, 2 ] -> 4 ataques de 1, 1, 1 y 2 pociones cada vez
 * //   3. [ 1, 1, 3 ] ...
 * //   4. [ 1, 2, 2 ] ...
 * //   5. [ 1, 4 ] ...
 * //   6. [ 2, 3 ] ...
 * //   7. [ 5 ] ...
 *
 * getAttackCombinations(5);
 * // => [ [ 1, 1, 1, 1, 1 ], [ 1, 1, 1, 2 ], [ 1, 1, 3 ], [ 1, 2, 2 ], [ 1, 4 ], [ 2, 3 ], [ 5 ]]
 */
function getAttackCombinations(totalPotions, start = 1, combination = [], combinations = []) {
  if (totalPotions === 0) {
    combinations.push(_.clone(combination));
  }

  for (var i = start; i <= totalPotions; i++) {
    combination.push(i);
    getAttackCombinations(totalPotions - i, i, combination, combinations);
    combination.pop();
  }

  return combinations;
}

/**
 * Obtener de todas las combinaciones de ataques, la que causa mayor daño
 * @param {Array} attackCombinations Combinaciones de ataques
 * @param {Array} damagePercentages Porcentajes de daños
 * @example
 *
 * // Combinaciones de ataques:
 * //   1. [ 1, 1, 1, 1, 1 ]
 * //   2. [ 1, 1, 1, 2 ]
 * //   3. [ 1, 1, 3 ]
 * //   4. [ 1, 2, 2 ]
 * //   5. [ 1, 4 ]
 * //   6. [ 2, 3 ]
 * //   7. [ 5 ]
 * // Porcentajes de daños:
 * //   [3, 5, 10, 20, 25] -> mezcla de 1 poción 3% de daño, mezcla de 2 pociones 5% de daño, ...
 * // de las anteriores combinaciones de ataques obtenemos la combinacíon de
 * // cause el mayor daño, segun los diferentes porcentajes de daños de las mezclas de pociones.
 * // Resultando:
 * //   { quantity: 5, damage: 25 } -> de todas las combinaciones la que mayor daño cuasara es
 * //   la combinación de un ataque de mezclar 5 posiones esta causara un daño del 25%
 * //
 *
 * getMaxAttacksDamage([[1, 1, 1, 1, 1],[1, 1, 1, 2],[1, 1, 3],[1, 2, 2],[1, 4],[2, 3],[5]], [3, 5, 10, 20, 25]);
 * // => [ { quantity: 5, damage: 25 } ]
 */
function getMaxAttacksDamage(attackCombinations, damagePercentages) {
  var damageAttackCombinations = _.map(attackCombinations, (combination) => {
    var potions = _.map(combination, (quantity) => ({
      quantity: quantity,
      damage: damagePercentages[quantity - 1]
    }));

    return {
      potions: potions,
      totalDamage: _.sum(_.map(potions, 'damage'))
    }
  });

  return _.maxBy(damageAttackCombinations, 'totalDamage').potions;
}
