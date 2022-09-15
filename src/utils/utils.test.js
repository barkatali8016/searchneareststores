const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");
var utils = rewire("./utils.js");
var sandbox = sinon.createSandbox();

describe("utils", () => {
  context("getLatLongByPostCode", () => {
    it("should call getLatLongByPostCode and return promise ", async () => {
      const result = await utils.getLatLongByPostCode(70001);
      expect(result).to.be.exist;
      expect(result.data).to.be.exist;

      expect(result).to.be.a("object");
      expect(result.data).to.be.a("object");
      expect(result.data.results[0]).to.have.property("lat");
      expect(result.data.results[0]).to.have.property("lon");
    });
  });

  context("getSuperMarketsByLatLong", () => {
    it("should call getSuperMarketsByLatLong and return promise ", async () => {
      const mockParams = {
        lat: 9.30694591,
        lon: -75.378054796,
        radius: 5000,
        limit: 20,
      };
      const result = await utils.getSuperMarketsByLatLong(mockParams);
      expect(result).to.be.exist;
      expect(result.data).to.be.exist;

      expect(result).to.be.a("object");
      expect(result.data).to.be.a("object");
      expect(result.data).to.have.property("features");
    });
  });
});
