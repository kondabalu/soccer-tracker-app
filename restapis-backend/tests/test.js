const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const SoccerTracker = require("../models/playerProfile");
const sinon = require("sinon");
const { MongoMemoryServer } = require("mongodb-memory-server-core");

chai.use(chaiHttp);
const expect = chai.expect;
const requestBody = {
  playername: "David Beckham",
  clubname: "FC Example",
  youthclub: "Youth Club Example",
  position: "Forward",
  goals: 10,
  assists: 5,
  yellowcards: 2,
  redcards: 0,
  tackles: 15,
  saves: 0,
  dateOfBirth: "1990-01-01",
};

const expectedResponse = {
  message: "Player Profile Added Successfully",
  posts: {
    playername: "David Beckham",
    clubname: "FC Example",
    youthclub: "Youth Club Example",
    position: "Forward",
    goals: 10,
    assists: 5,
    yellowcards: 2,
    redcards: 0,
    tackles: 15,
    saves: 0,
    dateOfBirth: "1990-01-01",
  }
};

describe("tests for Soccer Tracker Application", () => {
  let mongoServer;
  let saveStub;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    process.env.MONGODB_URI = mongoUri;
  });
  before(async function () {
    this.timeout(5000);
  });

  after(async () => {
    try {
      if (mongoServer) {
        await mongoServer.stop();
      }
    } catch (error) {
      console.error("Error stopping MongoDB server:", error);
    }
  });

  it("should retrieve profiles and return a JSON response with status 200", (done) => {
    const findStub = sinon.stub(SoccerTracker, "find").resolves(requestBody);


    chai
      .request(app)
      .get("/api/soccer-tracker/profiles")
      .end((err, res) => {
        if (err) {
          console.error(err);
          return done(err);
        }

        expect(res).to.have.status(200);

        expect(res.body).to.be.an("object");
        expect(res.body.message).to.equal("Profiles are found");
        expect(res.body.posts).to.deep.equal(expectedResponse.posts);

        expect(findStub.calledOnce).to.be.true;

        findStub.restore();

        done();
      });
  });

  it("should save a player profile and return a JSON response with status 201", (done) => {
    saveStub = sinon.stub(SoccerTracker.prototype, "save").resolves(expectedResponse.posts);

    chai
      .request(app)
      .post("/api/soccer-tracker/save")
      .send(requestBody)
      .end((err, res) => {
        if (err) {
          console.error(err);
          return done(err);
        }

        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal(expectedResponse);

        expect(saveStub.calledOnce).to.be.true;

        done();
      });
  });

  it("should update a player profile and return a JSON response with status 200", (done) => {
    const requestParams = { id: "some_id" };
    const updateRequestBody = {
      _id: requestParams.id,
      playername: "David Beckham",
      clubname: "FC Example",
      youthclub: "Youth Club Example",
      position: "Forward",
      goals: 10,
      assists: 5,
      yellowcards: 2,
      redcards: 0,
      tackles: 15,
      saves: 0,
      dateOfBirth: "1990-01-01",
    };

    const updateOneStub = sinon.stub(SoccerTracker, "updateOne").resolves({ nModified: 1 });

    chai
      .request(app)
      .put(`/api/soccer-tracker/update/${requestParams.id}`)
      .send(updateRequestBody)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ message: "Update Successful !" });
        done();
      })
      .catch((err) => done(err));
  });

  it("should delete a player profile and return a JSON response with status 200", (done) => {
    const requestParams = { id: "some_id" };

    const deleteOneStub = sinon.stub(SoccerTracker, "deleteOne").resolves({ deletedCount: 1 });

    chai
      .request(app)
      .delete(`/api/soccer-tracker/delete/${requestParams.id}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ message: "Profile deleted!" });
        expect(deleteOneStub.calledOnceWith({ _id: requestParams.id })).to.be.true;
        done();
      })
      .catch((err) => done(err));
  });

  it("should retrieve profiles sorted by goals and return a JSON response with status 200", (done) => {
    const profiles = [
      { name: "David Beckham", goals: 10 },
      { name: "Cristiano Ronaldo", goals: 8 },

    ];

    const findStub = sinon.stub(SoccerTracker, "find").returns({ sort: sinon.stub().resolves(profiles) });

    chai
      .request(app)
      .get("/api/soccer-tracker/goals")
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          message: "Profiles are found",
          posts: profiles,
        });
        expect(findStub.calledOnce).to.be.true;
        expect(findStub().sort.calledOnceWith({ goals: -1 })).to.be.true;
        done();
      })
      .catch((err) => done(err));
  });
});

