const request = require("supertest");
const User = require("../models/userModel");

// const app = require('../index.js');
// const db = require('../db');
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const app = require("../app");

let server = app.makeapp();
describe("register api check", () => {
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


  it("should register a new user", async () => {
    const userData = {
      username: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      gender: "male",
      avatarImage: "fff",
      isVerified: true,
    };
  
    const response = await request(server)
      .post("/api/auth/register")
      .send(userData);
    // console.log(response._body);


    expect(response._body.status).toBe(true);
    // expect(response.body).toMatchObject({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });
  });

  it("should give username already exists ", async () => {
    const userData = {
      username: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      gender: "male",
      avatarImage: "fff",
      isVerified: true,
    };
  
    const response = await request(server)
      .post("/api/auth/register")
      .send(userData);
    // console.log(response._body);


    expect(response._body.status).toBe(false);
    // expect(response.body).toMatchObject({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });
  });

  it("should give email already exists error", async () => {
    const userData = {
      username: "Johny Doe",
      email: "john.doe@example.com",
      password: "password123",
      gender: "male",
      avatarImage: "fff",
      isVerified: true,
    };
  
    const response = await request(server)
      .post("/api/auth/register")
      .send(userData);
    // console.log(response._body);


    expect(response._body.status).toBe(false);
    // expect(response.body).toMatchObject({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });
  });
});




