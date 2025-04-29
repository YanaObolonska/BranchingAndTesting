const Hamming = require('../classes/hamming');
const expect = require('chai').expect;

describe('getDataBits', () => {
  it('повертає правильні інформаційні біти з 7-бітного масиву', () => {
    const input = [0, 1, 1, 0, 0, 1, 1];
    const result = Hamming.getDataBits(input);
    expect(result).to.eql([1, 0, 1, 1]);
  });

  it('викидає помилку при некоректному вхідному масиві', () => {
    expect(() => Hamming.getDataBits([1, 0, 1])).to.throw();
  });
});

describe('flipAllBits', () => {
  it('інвертує всі біти у 7-бітному масиві', () => {
    const input = [1, 0, 1, 1, 0, 0, 1];
    const result = Hamming.flipAllBits(input);
    expect(result).to.eql([0, 1, 0, 0, 1, 1, 0]);
  });

  it('викидає помилку при неправильній довжині масиву', () => {
    expect(() => Hamming.flipAllBits([1, 0])).to.throw();
  });
});
