const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");
var index = rewire("./index.js");
var sandbox = sinon.createSandbox();

describe("index", () => {
  const PORT = process.env.PORT;
  context("startServer", () => {
    it("should call startServer and listening on port", () => {
      expect(PORT).to.deep.equal("" + 3000);
    });
  });
});
