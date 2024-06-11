'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get("/api/convert", function (req, res) {
    const input = req.query.input;
    const value = convertHandler.getNum(input);
    const unit = convertHandler.getUnit(input);
    const returnNum = parseFloat(convertHandler.convert(value, unit));
    const returnUnit = convertHandler.getReturnUnit(unit);
    const str = convertHandler.getString(value, unit, returnNum, returnUnit);
    if (str == "invalid number" || str == "invalid unit" || str == "invalid number and unit") {
      res.send(str);
    } else {
      res.send({
        initNum: value,
        initUnit: unit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: str
      });
    }
  })

};
