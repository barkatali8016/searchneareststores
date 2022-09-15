const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");
var expressApp = rewire("./express-app.js");
var sandbox = sinon.createSandbox();

describe("express-app", () => {
  context("expressApp", () => {
    it("should call expressApp", () => {
      // expressApp();
    });
  });
});
