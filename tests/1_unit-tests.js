const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('Natural number test', function () {
        assert.equal(convertHandler.getNum("4gal"), 4);
    });
    test('Decimal number test', function () {
        assert.equal(convertHandler.getNum("4.2gal"), 4.2);
    });
    test('Fraction number test', function () {
        assert.equal(convertHandler.getNum("4/5gal"), 0.8);
        assert.approximately(convertHandler.getNum("1/3gal"), 0.33333, 0.00001);
    });
    test('Fraction with decimal test', function () {
        assert.equal(convertHandler.getNum("5.4/3gal"), 1.8);
    });
    test('Double fraction', function () {
        assert.equal(convertHandler.getNum("3/2/3gal"), "invalid number");
    });
    test('No number', function () {
        assert.equal(convertHandler.getNum("gal"), 1);
    });
    test('Unit reading', function () {
        assert.equal(convertHandler.getUnit("4gal"), "gal");
        assert.equal(convertHandler.getUnit("4L"), "L");
    });
    test('Invalid unit', function () {
        assert.equal(convertHandler.getUnit("4g"), "invalid unit");
    });
    test('Unit conversion', function () {
        assert.equal(convertHandler.getReturnUnit("gal"), "L");
    });
    test('Unit explanation', function () {
        const initNum = "3.1";
        const initUnit = "mi";
        const returnNum = "4.98895";
        const returnUnit = "km";
        const str = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
        assert.equal(str, "3.1 miles converts to 4.98895 kilometers");
    });
    test('Converting gal to L', function () {
        const input = "4gal";
        const num = convertHandler.getNum(input);
        const unit = convertHandler.getUnit(input);
        assert.equal(convertHandler.convert(num, unit), "15.14164");
        assert.equal(convertHandler.getReturnUnit(unit), "L");
    });
    test('Converting L to gal', function () {
        const input = "4.5L";
        const num = convertHandler.getNum(input);
        const unit = convertHandler.getUnit(input);
        assert.equal(convertHandler.convert(num, unit), "1.18877");
        assert.equal(convertHandler.getReturnUnit(unit), "gal");
    });
    test('Converting mi to km', function () {
        const input = "5mi";
        const num = convertHandler.getNum(input);
        const unit = convertHandler.getUnit(input);
        assert.equal(convertHandler.convert(num, unit), "8.04670");
        assert.equal(convertHandler.getReturnUnit(unit), "km");
    });
    test('Converting km to mi', function () {
        const input = "6km";
        const num = convertHandler.getNum(input);
        const unit = convertHandler.getUnit(input);
        assert.equal(convertHandler.convert(num, unit), "3.72824");
        assert.equal(convertHandler.getReturnUnit(unit), "mi");
    });
    test('Converting lbs to kg', function () {
        const input = "7lbs";
        const num = convertHandler.getNum(input);
        const unit = convertHandler.getUnit(input);
        assert.equal(convertHandler.convert(num, unit), "3.17514");
        assert.equal(convertHandler.getReturnUnit(unit), "kg");
    });
    test('Converting kg to lbs', function () {
        const input = "8kg";
        const num = convertHandler.getNum(input);
        const unit = convertHandler.getUnit(input);
        assert.equal(convertHandler.convert(num, unit), "17.63700");
        assert.equal(convertHandler.getReturnUnit(unit), "lbs");
    });
});