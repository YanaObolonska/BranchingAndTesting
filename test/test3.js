const { expect } = require('chai');
const HammingCode = require('../classes/hamming');

describe('HammingCode.getErrorPosition', () => {
  it('повертає 0, якщо помилки немає', () => {
    const data = HammingCode.encode([1, 0, 1, 1]);
    expect(HammingCode.getErrorPosition(data)).to.equal(0);
  });

  it('повертає правильну позицію при помилці у 3-му біті', () => {
    const encoded = HammingCode.encode([1, 0, 1, 1]);
    const withError = HammingCode.injectError(encoded, 3);
    expect(HammingCode.getErrorPosition(withError)).to.equal(3);
  });
});

describe('HammingCode.getDataBits', () => {
  it('повертає початкові дані без паритетів', () => {
    const original = [1, 0, 1, 0];
    const encoded = HammingCode.encode(original);
    expect(HammingCode.getDataBits(encoded)).to.deep.equal(original);
  });

  it('повертає правильні дані після виправлення помилки', () => {
    const original = [0, 1, 1, 1];
    const encoded = HammingCode.encode(original);
    const corrupted = HammingCode.injectError(encoded, 5);
    const corrected = HammingCode.decode(corrupted);
    expect(corrected).to.deep.equal(original);
  });
});
