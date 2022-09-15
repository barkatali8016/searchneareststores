const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");
const { default: axios } = require("axios");
var utils = rewire("./utils.js");
var sandbox = sinon.createSandbox();

describe("utils", () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => (sandbox = sandbox.restore()));

  context("getLatLongByPostCode", () => {
    it("should call getLatLongByPostCode and return promise ", async () => {
      const mockRes = {
        data: { results: [{ lat: 123, lon: -123 }] },
      };
      sandbox.stub(axios, "get").resolves(mockRes);
      const result = await utils.getLatLongByPostCode(70001);

      expect(result).to.be.exist;
      expect(result.data).to.be.exist;

      expect(result).to.be.a("object");
      expect(result.data).to.be.a("object");
      expect(result.data.results[0]).to.have.property("lat");
      expect(result.data.results[0]).to.have.property("lon");
      expect(result.data.results[0]).to.have.property("lon").to.be.equal(-123);
      expect(result.data.results[0]).to.have.property("lat").to.be.equal(123);
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
      const mockRes = {
        data: { features: [{ pro: 122 }] },
      };
      sandbox.stub(axios, "get").resolves(mockRes);
      const result = await utils.getSuperMarketsByLatLong(mockParams);
      expect(result).to.be.exist;
      expect(result.data).to.be.exist;

      expect(result).to.be.a("object");
      expect(result.data).to.be.a("object");
      expect(result.data).to.have.property("features");
      expect(result.data.features[0]).to.have.property("pro");
      expect(result.data.features[0]).to.have.property("pro").to.be.equal(122);
    });
  });
  context("getSuperMarketConfig", () => {
    it("should call getSuperMarketConfig return config", () => {
      const params = {
        lat: 123,
        lon: -123,
        GEOAPIFYKEY: "apikey",
        radius: 800,
        limit: 10,
      };

      const config = utils.__get__("getSuperMarketConfig")(params);
      expect(config).to.be.a("string");
    });
  });

  context("getSuperMarketsByLatLong", () => {
    it("should call getSuperMarketsByLatLong return config", () => {
      const params = {
        lat: 123,
        lon: -123,
        radius: 800,
        limit: 10,
      };

      const config = utils.__get__("getSuperMarketConfig")(params);
      expect(config).to.be.a("string");
    });
  });
});
