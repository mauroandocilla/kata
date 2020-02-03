const potions = require('./Potions');

describe('User Class', () => {
  it('Should be a class', () => {
    expect(typeof potions.prototype.constructor).toEqual('function');
  });

  describe('User API', () => {
    describe('Constructor', () => {
      let red = null;
      let blue = null;
      let green = null;
      let yellow = null;
      let grey = null;

      beforeEach(() => {
        red = 2;
        blue = 2;
        green = 1;
        yellow = 1;
        grey = 1;
      });

      it('Should throw error for invalid arguments', () => {
        expect(() => new potions({
          red: 'a',
          blue: 2,
          green: 1,
          yellow: 1,
          grey: 1
        })).toThrow('Invalid Argument');
      });
    });
  });
});
