const chai = require("chai");
const assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

suite("Unit Tests", function () {
  const convertHandler = new ConvertHandler();

  test("Whole number", () => assert.equal(convertHandler.getNum("5kg"), 5));
  test("Decimal number", () =>
    assert.equal(convertHandler.getNum("2.5mi"), 2.5));
  test("Fraction", () => assert.equal(convertHandler.getNum("1/2km"), 0.5));
  test("Fraction with decimal", () =>
    assert.equal(convertHandler.getNum("2.5/5kg"), 0.5));
  test("Double fraction invalid", () =>
    assert.equal(convertHandler.getNum("3/2/3kg"), "invalid number"));
  test("Default number", () => assert.equal(convertHandler.getNum("kg"), 1));

  test("Valid units", () => {
    ["gal", "L", "lbs", "kg", "mi", "km"].forEach((u) =>
      assert.notEqual(convertHandler.getUnit("1" + u), "invalid unit")
    );
  });

  test("Invalid unit", () =>
    assert.equal(convertHandler.getUnit("32g"), "invalid unit"));

  test("Return units", () => {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
  });

  test("Spelled units", () => {
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
  });

  test("Conversions", () => {
    assert.equal(convertHandler.convert(1, "gal"), 3.78541);
    assert.equal(convertHandler.convert(1, "L"), 0.26417);
    assert.equal(convertHandler.convert(1, "mi"), 1.60934);
    assert.equal(convertHandler.convert(1, "km"), 0.62137);
    assert.equal(convertHandler.convert(1, "lbs"), 0.45359);
    assert.equal(convertHandler.convert(1, "kg"), 2.20462);
  });
});
