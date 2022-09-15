const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");
var controller = rewire("./controller.js");
var sandbox = sinon.createSandbox();

describe("controller", () => {
  let stub;
  beforeEach(() => {
    // secretStub = sandbox.stub(config, 'secret').returns('fake_secret');
    //     digestStub = sandbox.stub().returns('ABC123');
    //     updateStub = sandbox.stub().returns({
    //         digest: digestStub
    //     });
  });
  context("getNearBySuperMarkets", () => {
    it("should call getNearBySuperMarkets and return formatedResponse", async (done) => {
      const mockReq = {
        params: { postcode: 700001 },
        query: {
          limit: 20,
          radius: 5000,
        },
      };
      const mockRes = {};
      const result = await controller.getNearBySuperMarkets(mockReq, mockRes);
      expect(result).to.be.exist;
      expect(result).to.be.a("object");
      done();
    });
  });
});
