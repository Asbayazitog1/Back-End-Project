const app = require("../db/app")
const request = require("supertest")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data/")
const db = require("../db/connection")
require("jest-sorted")

beforeEach(() => {
    return seed(data);
  });
  afterAll(() => {
    return db.end();
  });

describe("GET /api/topics",()=>{
    test("responds 200 status and all topics with its data",()=>{
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) =>{
            expect(body.length).toBe(3)
            body.forEach( topic =>{
                expect(topic).toMatchObject({
                    description: expect.any(String),
                    slug: expect.any(String)
                })
            })
        })
    })
    test("responds with 404 with an invalid API request", () => {
        return request(app)
          .get("/api/tops")
          .expect(404)

      });
})  