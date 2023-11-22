const app = require("../db/app")
const request = require("supertest")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data/")
const db = require("../db/connection")
const { string } = require("pg-format")
const articles = require("../db/data/test-data/articles")
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
            expect(body.topics.length).toBe(3)
            body.topics.forEach( topic =>{
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
          .then((data) => {
            expect(data.res.statusMessage).toBe("Not Found");
          });
      });
})  
describe("GET /api",()=>{
    test("responds with 200 with all /api paths and their info ",()=>{
        return request(app)
        .get('/api')
        .expect(200)
        .then(({endpoints})=>{ 
            for(key in endpoints){expect(endpoints).toMatchObject({
                "description": expect.any(String),
                "queries": expect.any(Array),
                "exampleResponse": expect.any(Object)
               })  }
          
        })
    })
})

describe("GET/api/articles/:article_id",()=>{
    test("responds with 200 and article info of given article id",()=>{
        return request(app)
        .get('/api/articles/2')
        .expect(200).then(({body}) =>{
            expect(body).toEqual({articles :{
                article_id:2,
                title: "Sony Vaio; or, The Laptop",
                topic: "mitch",
                author: "icellusedkars",
                body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
                created_at: "2020-10-16T05:03:00.000Z",
                article_img_url:
                  "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                  votes:0
              }})
        })
    })
    test("responds with 400 when article id is NaN",()=>{
        return request(app)
        .get("/api/articles/one")
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("bad request")
        })
    })
    test("responds with 404 when the article id dont match with db",()=>{
       return request(app)
       .get('/api/articles/99')
       .expect(404)
       .then(({body})=>{
        expect(body.msg).toBe("not found")
    })
    })
})

describe("GET /api/articles",()=>{
    test("responds with 200 and all articles in an array without body property",()=>{
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({body})=>{
            const articles =body.articles
            expect(articles.length).toBe(13);
            articles.forEach(article =>{
                expect(article).not.toHaveProperty("body")
                expect(article).toMatchObject({
                    author : expect.any(String),
                    title : expect.any(String),
                    article_id:expect.any(Number),
                    topic :expect.any(String),
                    created_at: expect.any(String),
                    votes : expect.any(Number),
                    article_img_url :expect.any(String),
                    comment_count : expect.any(Number)
                })
            })
        })
    })
    test("responds with 200 and all item in array should be sorted by date",()=>{
        return request(app)
        .get("/api/articles?sort_by=created_at")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("created_at", { descending: true });
        })
    })
    test("responds with 400 with an invalid order option", () => {
        return request(app)
          .get("/api/articles?sort_by=date")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid sort option");
          });
})
})