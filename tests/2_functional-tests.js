const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const assert = chai.assert;

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Valid input", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "10L" })
      .end((err, res) => {
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        done();
      });
  });

  test("Invalid unit", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "32g" })
      .end((err, res) => {
        assert.equal(res.text, "invalid unit");
        done();
      });
  });

  test("Invalid number", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4kg" })
      .end((err, res) => {
        assert.equal(res.text, "invalid number");
        done();
      });
  });

  test("Invalid number and unit", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4kilomegagram" })
      .end((err, res) => {
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });

  test("No number", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "kg" })
      .end((err, res) => {
        assert.equal(res.body.initNum, 1);
        done();
      });
  });
});
