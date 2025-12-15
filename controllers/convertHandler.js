function ConvertHandler() {
  const units = {
    gal: { returnUnit: "L", spell: "gallons", factor: 3.78541 },
    l: { returnUnit: "gal", spell: "liters", factor: 1 / 3.78541 },
    lbs: { returnUnit: "kg", spell: "pounds", factor: 0.453592 },
    kg: { returnUnit: "lbs", spell: "kilograms", factor: 1 / 0.453592 },
    mi: { returnUnit: "km", spell: "miles", factor: 1.60934 },
    km: { returnUnit: "mi", spell: "kilometers", factor: 1 / 1.60934 },
  };

  this.getNum = function (input) {
    const num = input.match(/^[\d./]+/);
    if (!num) return 1;

    const str = num[0];
    if ((str.match(/\//g) || []).length > 1) return "invalid number";

    if (str.includes("/")) {
      const [a, b] = str.split("/");
      if (isNaN(a) || isNaN(b)) return "invalid number";
      return parseFloat(a) / parseFloat(b);
    }

    return parseFloat(str);
  };

  this.getUnit = function (input) {
    const unit = input.match(/[a-zA-Z]+$/);
    if (!unit) return "invalid unit";

    const u = unit[0].toLowerCase();
    if (u === "l") return "L";
    return units[u] ? u : "invalid unit";
  };

  this.getReturnUnit = function (initUnit) {
    const key = initUnit.toLowerCase();
    return units[key]?.returnUnit;
  };

  this.spellOutUnit = function (unit) {
    const key = unit.toLowerCase();
    return units[key]?.spell;
  };

  this.convert = function (initNum, initUnit) {
    const key = initUnit.toLowerCase();
    return Math.round(initNum * units[key].factor * 100000) / 100000;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
