export default class PhoneFormat {
  /**
   * ⚡️ Will send you all the number format with the country data
   * @param {string} number accept number too and it's should have the phone number
   * @param {string} iso accept string only, it's should have the country code like iq usa etc...
   */
  static getAllFormats(number) {
    number = this.convertNumbers2English(number);
    number = number.toString().replace(/[^0-9]/gi, "");
    number = this.normalize(number);
    const arrCheck = { "75": true, "77": true, "78": true, "79": true };

    let cleanNumber = this.normalize(number);
    let globalK = "964" + cleanNumber;
    let obj = {
      isNumber: number.match(/[^0-9]/gi) == null,
      globalZ: "00" + "964" + cleanNumber,
      globalP: "+" + "964" + cleanNumber,
      globalK: globalK,
      domestic: "0" + cleanNumber,
      domestic2: cleanNumber,
      format1: this.format(globalK, "(NNN) NNN-NNNN"),
      format2: this.format(globalK, "NNN.NNN.NNNN"),
    };

    let check = cleanNumber.substr(0, 2);

    obj.isNumber = arrCheck[check] ? true : false;

    return obj;
  }

  /**
   * 🧼 Will send a clean number without the extra keys
   * @param {string} number accept number too and it's should have the phone number
   */
  static normalize(phoneNumber) {
    return phoneNumber.replace(
      /^[\+\d{1,3}\-\s]*\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "$1$2$3"
    );
  }

  /**
   * 😎 Will give you the cool formats for the number like '(964) 781-****'
   * @param {string} number accept number too and it's should have the phone number
   */
  static format(phoneNumber, formatString, options = null) {
    // Normalize the phone number first unless not asked to do so in the options
    if (!options || !options.normalize) {
      phoneNumber = this.normalize(phoneNumber);
    }
    for (var i = 0, l = phoneNumber.length; i < l; i++) {
      formatString = formatString.replace("N", phoneNumber[i]);
    }
    return formatString;
  }

  /**
   * 👳🏽‍♀️Arabic numbers to English
   * @param {String} string Any string
   */
  static convertNumbers2English(string) {
    return string
      .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (c) {
        return c.charCodeAt(0) - 1632;
      })
      .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (c) {
        return c.charCodeAt(0) - 1776;
      });
  }
}
