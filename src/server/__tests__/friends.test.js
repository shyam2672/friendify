const request = require("supertest");
const User = require("../models/userModel");

// const app = require('../index.js');
// const db = require('../db');
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const app = require("../app");
let token1;
let token2;

let user1id;
let user2id;
let server = app.makeapp();
describe("friends api check", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri()).then(console.log("connected"));
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();

    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // jest.setTimeout(60000);
    // p = new SUT.PlaywrightFluent();
  });

  it("should register  user1", async () => {
    const userData = {
      username: "John1 Doe",
      email: "john1.doe@example.com",
      password: "password123",
      gender: "male",
      avatarImage: "fff",
      isVerified: true,
    };

    const response = await request(server)
      .post("/api/auth/register")
      .send(userData);
    // console.log(response._body);

    token1 = response._body.user.token;
    id1 = response._body.user._id;
    // console.log(token);
    // console.log(id);

    expect(response._body.status).toBe(true);
    // expect(response.body).toMatchObject({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });
  });

  it("should register  user2", async () => {
    const userData = {
      username: "John2 Doe",
      email: "john2.doe@example.com",
      password: "password123",
      gender: "male",
      avatarImage: "fff",
      isVerified: true,
    };

    const response = await request(server)
      .post("/api/auth/register")
      .send(userData);
    // console.log(response._body);

    // token2 = response._body.user.token;
    id2 = response._body.user._id;
    // console.log(token);
    // console.log(id);

    expect(response._body.status).toBe(true);
    // expect(response.body).toMatchObject({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });
  });

  it("user1 should add user2 as friend ", async () => {
    const userData = {
      senderid: id1,
      receiverid: id2,
    };

    const response = await request(server)
      .post("/api/auth/addfriend")
      // .set("Authorization", `Bearer ${token1}`)
      .send(userData);
    // console.log(response._body);

    expect(response._body.status).toBe(true);
    // expect(response.body).toMatchObject({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });
  });

  it("should give friends already exists error ", async () => {
    const userData = {
      senderid: id1,
      receiverid: id2,
    };

    const response = await request(server)
      .post("/api/auth/addfriend")
      // .set("Authorization", `Bearer ${token1}`)
      .send(userData);
    // console.log(response._body.message);

    expect(response._body.message).toEqual("already added as friend");
    // expect(response.body).toMatchObject({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });
  });

  it("should get friend ", async () => {
    const userData = {
      id: id1,
    };

    const response = await request(server)
      .post("/api/auth/friends")
      // .set("Authorization", `Bearer ${token1}`)
      .send(userData);
    // console.log(response._body);

    expect(response._body[0].username).toEqual("John2 Doe");
    // expect(response.body).toMatchObject({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });
  });

  it("should delete friend ", async () => {
    const userData = {
      friendid: id2,
      id: id1,
    };
    const userData1 = {
      id: id1,
    };

    const response = await request(server)
      .post("/api/auth/deletefriend")
      // .set("Authorization", `Bearer ${token1}`)
      .send(userData);
    // console.log("fsd");
    // console.log(response._body);

    expect(response._body.status).toEqual(true);
    //   const response1 = await request(server)
    //   .post("/api/auth/friends")
    //   .set("Authorization", `Bearer ${token1}`)
    //   .send(userData1);
    // console.log(response1._body);

    // expect(response1._body[0].username).not.toEqual("John2 Doe");

    // expect(response.body).toMatchObject({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });
  });
});
