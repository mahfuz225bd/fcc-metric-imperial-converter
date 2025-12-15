"use strict";

const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  app.get("/api/convert", function (req, res) {
    const input = req.query.input;
    const handler = new ConvertHandler();

    const initNum = handler.getNum(input);
    const initUnit = handler.getUnit(input);

    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return res.send("invalid number and unit");
    }
    if (initNum === "invalid number") return res.send("invalid number");
    if (initUnit === "invalid unit") return res.send("invalid unit");

    const returnUnit = handler.getReturnUnit(initUnit);
    const returnNum = handler.convert(initNum, initUnit);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: handler.getString(initNum, initUnit, returnNum, returnUnit),
    });
  });
};
