let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);
const url = "https://www.spotahome.com/api/public/listings/search";
describe("get markers  from site: spotahome ", () => {
  it("get data of city: Madrid", (done) => {
    chai
      .request(url)
      .get("/markers/madrid")
      .end(function (err, res) {
        // console.log(res.body)
        expect(res).to.have.status(200);
        done();
      });
  });

  it("get Apartments of Madrid ", (done) => {
    chai
      .request(url)
      .get("/markers/madrid?type[]=apartments")
      .end(function (err, res) {
        //console.log(res.body)
        expect(res).to.have.status(200);
        done();
      });
  });
});
