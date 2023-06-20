const request = require("supertest");
const User = require("../models/userModel");

// const app = require('../index.js');
// const db = require('../db');
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const app = require("../app");
let token;
let id;
let server = app.makeapp();
describe("setrandomname api check", () => {
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
    console.log(response._body);

token=response._body.user.token;
id=response._body.user._id;
console.log(token);
console.log(id);

    expect(response._body.status).toBe(true);
    // expect(response.body).toMatchObject({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });
  });

  it("should set random username ", async () => {
    const userData = {
     random_username:"randomname",
     id:id,
    };
  
    const response = await request(server)
      .post("/api/auth/setrandomusername")
      // .set("Authorization", `Bearer ${token}`)
      .send(userData);
    // console.log(response._body);


    expect(response._body.status).toBe(true);
    // expect(response.body).toMatchObject({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });
  });

}
  
);




