// Hamming 4->7
class HammingCode {
  // dataToEncode [i1, i2, i3, i4]
  static encode(dataToEncode) {
    if(dataToEncode.length != 4) {
      throw Error("HammingCode: encode input must have exactly 4 bits");
    }

    for(let i = 0; i < 4; i++) {
      if((dataToEncode[i] > 1)||(dataToEncode[i] == null)||(dataToEncode[i].toString() == 'undefined')) {
        throw Error("HammingCode: encode input must consist of bits");
      }
    }

    let hammingEncoded = [1,1,1,1,1,1,1]; // p1 p2 i1 p3 i2 i3 i4

    hammingEncoded[2] = dataToEncode[0];
    hammingEncoded[4] = dataToEncode[1];
    hammingEncoded[5] = dataToEncode[2];
    hammingEncoded[6] = dataToEncode[3];

    hammingEncoded[0] = hammingEncoded[2] ^ hammingEncoded[4] ^ hammingEncoded[6];
    hammingEncoded[1] = hammingEncoded[2] ^ hammingEncoded[5] ^ hammingEncoded[6];
    hammingEncoded[3] = hammingEncoded[4] ^ hammingEncoded[5] ^ hammingEncoded[6];

    return hammingEncoded;
  }

  // dataToDecode [p1, p2, i1, p3, i2, i3, i4]
  static decode(dataToDecode) {
    if (dataToDecode.length !== 7) {
      throw Error("HammingCode: decode input must have exactly 7 bits");
    }

    // Calculation of error checking bits
    const p1 = dataToDecode[2] ^ dataToDecode[4] ^ dataToDecode[6];
    const p2 = dataToDecode[2] ^ dataToDecode[5] ^ dataToDecode[6];
    const p3 = dataToDecode[4] ^ dataToDecode[5] ^ dataToDecode[6];

    // Determining the position of the bit in error (if any)
    let errorPosition = 0;
    if (p1 !== dataToDecode[0]) {
      errorPosition += 1;
    }
    if (p2 !== dataToDecode[1]) {
      errorPosition += 2;
    }
    if (p3 !== dataToDecode[3]) {
      errorPosition += 4;
    }

    // Error correction (if found)
    if (errorPosition !== 0) {
      dataToDecode[errorPosition - 1] = 1 - dataToDecode[errorPosition - 1]; // Changing the value of a bit
    }

    return [dataToDecode[2], dataToDecode[4], dataToDecode[5], dataToDecode[6]];
  }

  // Вводить одиничну помилку в код (інвертує вказаний біт)
  static injectError(data, position) {
    if (!Array.isArray(data) || data.length !== 7) {
      throw Error("injectError: input must be 7-bit array");
    }
    if (position < 1 || position > 7) {
      throw Error("injectError: position must be in range 1-7");
    }

    const corrupted = [...data];
    corrupted[position - 1] = 1 - corrupted[position - 1];
    return corrupted;
  }

  // Перевіряє правильність коду (чи немає помилок у 7-бітному масиві)
  static isValid(data) {
    if (!Array.isArray(data) || data.length !== 7) {
      throw Error("isValid: input must be 7-bit array");
    }

    const p1 = data[2] ^ data[4] ^ data[6];
    const p2 = data[2] ^ data[5] ^ data[6];
    const p3 = data[4] ^ data[5] ^ data[6];

    let errorPosition = 0;
    if (p1 !== data[0]) errorPosition += 1;
    if (p2 !== data[1]) errorPosition += 2;
    if (p3 !== data[3]) errorPosition += 4;

    return errorPosition === 0;
  }

  /**
   * NEW: Повертає лише інформаційні біти з 7-бітного Hamming-коду.
   * @param {Array} data - 7-бітний масив
   * @returns {Array} масив із 4 інформаційних бітів [i1, i2, i3, i4]
   */
  static getDataBits(data) {
    if (!Array.isArray(data) || data.length !== 7) {
      throw Error("getDataBits: input must be 7-bit array");
    }
    return [data[2], data[4], data[5], data[6]];
  }

  /**
   * NEW: Інвертує всі біти у 7-бітному масиві (0 → 1, 1 → 0).
   * @param {Array} data - 7-бітний масив
   * @returns {Array} новий масив з інверсією бітів
   */
  static flipAllBits(data) {
    if (!Array.isArray(data) || data.length !== 7) {
      throw Error("flipAllBits: input must be 7-bit array");
    }
    return data.map(bit => bit === 0 ? 1 : 0);
  }
}

module.exports = HammingCode;
