const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { default: axios } = require("axios");
chai.use(sinonChai);
const rewire = require("rewire");
var controller = rewire("./controller.js");
var utils = rewire("../utils/utils");
var sandbox = sinon.createSandbox();

describe("controller", () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => (sandbox = sandbox.restore()));

  context("getSuperMarketsHelper", () => {
    it("should call getSuperMarketsHelper resolves", async () => {
      let mockResponse = {
        total: 25,
        supermarkets: [{}],
      };
      sandbox.stub(utils, "getSuperMarketsByLatLong").resolves(mockResponse);

      const response = await controller.__get__("getSuperMarketsHelper")({
        lat: 123,
        lon: -123,
        limit: 20,
        radius: 5000,
      });

      // console.log(response, " response response ");
      expect(response.status).to.be.equal(200);
    });

    it("should call getSuperMarketsHelper rejects", async () => {
      let mockErr = new Error();
      sandbox.stub(utils, "getSuperMarketsByLatLong").throws(mockErr);

      // const response = await controller.__get__("getSuperMarketsHelper")({
      //   lat: 123,
      //   lon: -123,
      //   limit: 20,
      //   radius: 5000,
      // });
      // const actual = ;

      try {
        await controller.__get__("getSuperMarketsHelper")({
          lat: 123,
          lon: -123,
          limit: 20,
          radius: 5000,
        });
      } catch (error) {
        expect(error).to.be.equal(err);
      }

      // console.log(response, " response response ");
      // expect(response.status).to.be.equal(200);
    });
  });

  context("formatResponse", () => {
    it("should call formatResponse", () => {
      const mockParams = {
        data: { features: [{ pro: 122 }] },
      };
      const response = controller.__get__("formatResponse")(mockParams);
      expect(response).to.be.a("object");
      expect(response.total).to.be.equal(1);
    });

    it("should call formatResponse No details found for this postcode!", () => {
      const mockParams = {
        data: { features: [] },
      };
      const response = controller.__get__("formatResponse")(mockParams);
      expect(response).to.be.a("object");
      expect(response.message)
        .to.be.a("string")
        .to.be.equal("No details found for this postcode!");
    });
  });

  context("getNearBySuperMarkets", () => {
    // it("should call getNearBySuperMarkets and return formatedResponse", () => {
    //   const mockReq = {
    //     params: { postcode: 700001 },
    //     query: {
    //       limit: 20,
    //       radius: 5000,
    //     },
    //   };
    //   const mockRes = {};
    //   const result = controller.getNearBySuperMarkets(mockReq, mockRes);
    //   expect(result).to.be.exist;
    // });

    it("should call getNearBySuperMarkets based on post code", async () => {
      const mockResponse = {
        data: { results: [{ lat: 123, lon: -123 }] },
      };
      sandbox.stub(utils, "getLatLongByPostCode").resolves(mockResponse);

      const mockResponse2 = {
        data: { features: [{ pro: 122 }] },
      };
      // const fx = controller.__get__("getSuperMarketsHelper");
      // sandbox.stub(controller, "formatResponse").resolves(mockResponse2);
      let formatResponseStub = sinon.stub().resolves(mockResponse2);

      controller.__set__("formatResponse", formatResponseStub);
      const mockRes1 = {
        data: { features: [{ pro: 122 }] },
      };
      sandbox.stub(axios, "get").resolves(mockResponse);

      const mockReq = {
        params: { postcode: 700001 },
        query: {
          limit: 20,
          radius: 5000,
        },
      };
      const mockRes = {};
      const result = await controller.getNearBySuperMarkets(mockReq, mockRes);

      // try {
      //   result(mockReq, mockRes);
      // } catch (error) {
      // }
      expect(result).to.be.equal(mockResponse);
    });

    it("should fetch nearest super makets  based on post code and throw error", () => {
      const err = {
        response: {
          data: {
            statusCode: 500,
            message: "Something went wrong!",
          },
        },
      };
      sandbox.stub(utils, "getLatLongByPostCode").rejects(err);

      const mockReq = {
        params: { postcode: 700001 },
        query: {
          limit: 20,
          radius: 5000,
        },
      };
      const mockRes = {};
      const result = controller.getNearBySuperMarkets;

      try {
        result(mockReq, mockRes);
      } catch (error) {
        expect(error).to.be.equal(err);
      }
    });
  });
});
