const request = require("supertest");
const User = require("../models/userModel");

// const app = require('../index.js');
// const db = require('../db');
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const app = require("../app");
let token1;
let token2;

let id1;
let id2;
let server = app.makeapp();
describe("messages api check", () => {
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
    console.log(response._body);

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
    console.log(response._body);

    token2 = response._body.user.token;
    id2 = response._body.user._id;
    // console.log(token);
    // console.log(id);

    expect(response._body.status).toBe(true);
    // expect(response.body).toMatchObject({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });
  });

  it("user1 sends message to user2 ", async () => {
    const userData = {
      from: id1,
      to: id2,
      message:"hey hi"
    };

    const response = await request(server)
      .post("/api/messages/addmsg/")
      .send(userData);
    console.log(response._body);

    expect(response._body.status).toEqual("sent");
    // expect(response.body).toMatchObject({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });
  });

  it("user2 should receive message ", async () => {
    const userData = {
      from:id1,
      to:id2,
    };

    const response = await request(server)
      .post("/api/messages/getmsg/")
      .send(userData);
      console.log("gfg");
    console.log(response._body.messages[0]);

    expect(response._body.messages[0].message).toEqual("hey hi");
    // expect(response.body).toMatchObject({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });
  });

  it("delete message api ", async () => {
    const userData = {
      from:id1,
      to:id2
    };

    const response = await request(server)
      .post("/api/messages/deletemsg/")
      .send(userData);
      
    console.log(response._body);

    expect(response._body.status).toEqual("deleted");
    // expect(response.body).toMatchObject({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });
  });
});
