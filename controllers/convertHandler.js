function ConvertHandler() {

  function getValueAndUnit(str) {
    const firstLetterOfUnits = ['g', 'G', 'l', 'L', 'm', 'M', 'k', 'K'];
    const strArray = str.split('');
    const index = strArray.findIndex(char => firstLetterOfUnits.includes(char));
    if (index != -1) {
      return {
        value: str.substring(0, index),
        unit: str.substring(index)
      };
    }
    return { value: "", unit: "" }
  }

  this.getNum = function (input) {
    const str = getValueAndUnit(input)["value"];
    if (str.length == 0) {
      return 1;
    }
    const index = str.indexOf('/');
    if (index !== -1 && str.indexOf('/', index + 1) !== -1) {
      return "invalid number";
    } else if (index !== -1) {
      const numerator  = parseFloat(str.substring(0, index));
      const denominator  = parseFloat(str.substring(index + 1));
      return (numerator / denominator);
    } else {
      return parseFloat(str);
    }
  };

  this.getUnit = function (input) {
    let str = getValueAndUnit(input)["unit"];
    let strLowerCase = str.toLowerCase();
    if (strLowerCase == "l") {
      return "L";
    }
    if( ["gal", "lbs", "kg", "mi", "km"].includes(strLowerCase)) {
      return strLowerCase;
    }
    return "invalid unit";
  };

  this.getReturnUnit = function (initUnit) {
    if (initUnit.toLowerCase() == "gal") {
      return "L";
    }
    if (initUnit.toLowerCase() == "lbs") {
      return "kg";
    }
    if (initUnit.toLowerCase() == "mi") {
      return "km";
    }
    if (initUnit.toLowerCase() == "l") {
      return "gal";
    }
    if (initUnit.toLowerCase() == "kg") {
      return "lbs";
    }
    if (initUnit.toLowerCase() == "km") {
      return "mi";
    }
    return "invalid unit";
  };

  this.spellOutUnit = function (unit) {
    if (unit == "gal") return "gallons";
    if (unit == "L") return "liters";
    if (unit == "lbs") return "pounds";
    if (unit == "kg") return "kilograms";
    if (unit == "mi") return "miles";
    if (unit == "km") return "kilometers";
    return unit;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    if (initUnit == "gal") return (initNum * galToL).toFixed(5);
    if (initUnit == "L") return (initNum / galToL).toFixed(5);
    if (initUnit == "lbs") return (initNum * lbsToKg).toFixed(5);
    if (initUnit == "kg") return (initNum / lbsToKg).toFixed(5);
    if (initUnit == "mi") return (initNum * miToKm).toFixed(5);
    if (initUnit == "km") return (initNum / miToKm).toFixed(5);
    return initNum;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    if (initNum == "invalid number" && initUnit == "invalid unit") {
      return "invalid number and unit";
    }
    if (initNum == "invalid number") {
      return initNum;
    }
    if (initUnit == "invalid unit") {
      return initUnit;
    }
    return initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
  };

}

module.exports = ConvertHandler;
