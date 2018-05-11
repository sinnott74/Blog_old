import request from "supertest";
import server from "../../dist/core/server";

const JoeBloggs = {
  id: 1,
  username: "test@test.com",
  firstname: "Joe",
  lastname: "Bloggs",
  fullname: "Joe Bloggs",
  dob: "2018-01-01T00:00:00.000Z"
};

describe("User Route", () => {
  describe("/api/users", () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(server).get("/api/users");
    });

    it("returns 200 for a get request", () => {
      expect(response.status).toBe(200);
    });

    it("returns JSON", () => {
      expect(response.header["content-type"]).toEqual(
        "application/json; charset=utf-8"
      );
    });

    it("returns an array", () => {
      expect(response.body).toBeInstanceOf(Array);
    });

    it("returns an array containing Joe Bloggs", () => {
      expect(response.body).toContainEqual(JoeBloggs);
    });
  });

  describe("/api/users/:id", () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(server).get("/api/users/1");
    });

    it("returns 200 for a get request", () => {
      expect(response.status).toBe(200);
    });

    it("returns JSON", () => {
      expect(response.header["content-type"]).toEqual(
        "application/json; charset=utf-8"
      );
    });

    it("returns Joe Bloggs' user", () => {
      expect(response.body).toEqual(JoeBloggs);
    });
  });
});
