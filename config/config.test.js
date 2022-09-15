const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");
var config = rewire("./config.js");
var sandbox = sinon.createSandbox();

describe("config", () => {
  const PORT = process.env.PORT;
  context("config PORT ", () => {
    it("should call check PORT", () => {
      expect(config.PORT).to.deep.equal("" + PORT);
      expect(config.GEOAPIFYKEY).to.be.exist;
      expect(config.APP_SECRET).to.be.exist;
    });
  });

  context("config PORT in prod", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "prod";
    });
    it("should call check PORT in prod env", () => {
      expect(config.PORT).to.deep.equal("" + PORT);
      expect(config.GEOAPIFYKEY).to.be.exist;
      expect(config.APP_SECRET).to.be.exist;
    });
  });
});
