const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");
const request = require("supertest");

var routes = rewire("./routes");
var controller = rewire("../controllers/controller");
var sandbox = sinon.createSandbox();

describe("routes", () => {
  afterEach(() => {
    routes = rewire("./routes");
    sandbox.restore();
  });

  context("GET /near-by-supermarkets/:postcode", () => {
    it("should get with id /near-by-supermarkets/:postcode", () => {
      let res = {
        total: 25,
        supermarkets: [{}],
      };
      sandbox.stub(controller, "getNearBySuperMarkets").resolves(res);
      request(routes)
        .get("/near-by-supermarkets/700001")
        .expect(200)
        .end((err, response) => {
          console.log(response, "totaltotaltotal");
          expect(response.body).to.have.property("total").to.equal(25);
        });
    });
  });
});
