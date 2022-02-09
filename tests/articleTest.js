import chai from "chai"
import chaiHttp from "chai-http"
import app from "../src/app"
import dbSchema from "../src/models/article"
import { generateToken } from "../src/helpers/jwtFunction";
import commentSchema from "../src/models/comment"
import fs from "fs"
import path from "path"

chai.use(chaiHttp)

describe("ARTICLES", () => {
     let testSchema = new dbSchema ({
               title: "Test article",
               content: "Lorem ipsum",
               image: "URL",
               comments: [{
                    name: "gabin", 
                    content: "nice article"
               },
               {
                    name: "ishimwe", 
                    content: "good article"
               }],
               likes: 0
          })
     before(async () => {
          await testSchema.save()
          
     })
     

     describe("TESTING GET ALL ARTICLES", () => {
          it("it should retrieve all articles", async () => {
               const res = await chai.request(app).get("/api/v1/articles")
               chai.expect(res).to.have.status([202])
               chai.expect(res.body).to.be.a("object")
               chai.expect(res.body.message).to.be.eq("all article!!!!")
               chai.expect(res.body.data).to.be.a("array")
          })

          it("it should show error message on invalid route", async () => {
               const res = await chai.request(app).get("/api/v1/artic")
               chai.expect(res).to.have.status([404])
               chai.expect(res).to.have.property("error")
          })
     })

     describe("GET ONE ARTICLE BY ID", () => {
          it("it should retrieve one article", async () => {
               const id = testSchema._id
               const res = await chai.request(app).get("/api/v1/articles/" + id)
               chai.expect(res).to.be.a("object")
               // console.log(res)
               chai.expect(res.body).to.have.property("_id")
               chai.expect(res.body).to.have.property("title")
               chai.expect(res.body).to.have.property("content")
               chai.expect(res.body).to.have.property("image")
               chai.expect(res.body).to.have.property("comments")
               chai.expect(res.body).to.have.property("likes")
               chai.expect(res.body).to.have.property("author")
               chai.expect(res.body).to.have.property("date")


          })

          it("it should not retrieve all article", async() => {
               const id = testSchema._id
               const res = await chai.request(app).get("/api/v1/artic/" + id)
               chai.expect(res.status).to.be.eq(404) 
          })
     })

     describe("CREATE POST", () => {
          it("it should not create post without authentication", async() => {
               const res = await chai.request(app).post("/api/v1/articles/")
               .send({
                    title: "updated the title", 
                    content: "update lorem ipsum",
                    comments: [],
                    likes: 0

               })
               chai.expect(res.text).is.eq("Access denied!!!")
               chai.expect(res.status).is.eq(401)

          })

          it("it should not post without title", async () => {
               const token = await generateToken({id: testSchema._id})
               const res = await chai.request(app).post("/api/v1/articles/")
               .set({"Authorization": `Bearer ${token}`})
               .send({
                    title: "", 
                    content: "update lorem ipsum",
                    comments: [],
                    likes: 0

               })
               chai.expect(res.status).to.be.eq(400)
               chai.expect(res.body).to.have.property("errorMessage")
               chai.expect(res.body.errorMessage).to.be.eq("Article title required!!!")
          })

          it("it should not post without content of 100 characters", async () => {
               const token = await generateToken({id: testSchema._id})
               const res = await chai.request(app).post("/api/v1/articles/")
               .set({"Authorization": `Bearer ${token}`})
               .send({
                    title: "create this article", 
                    content: "update",
                    comments: [],
                    likes: 0

               })
               chai.expect(res.status).to.be.eq(400)
               chai.expect(res.body.errorMessage).to.be.eq("Article content must be of min 100 characters!!!")
          })


          it("it should create an article", async ()=> {
               const token = await generateToken({id: testSchema._id})
               const res = await chai.request(app).post("/api/v1/articles/")
               .set({"Authorization": `Bearer ${token}`})
               // .type("form")
               .attach("image", path.join( __dirname, "./testingImage/linkedinAboutMe.png"), "linkedinAboutMe.png")
               .field("title", "Creating article")
               .field("content", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
               .field("likes", 0)
               
               chai.expect(res.status).to.be.eq(202)
               chai.expect(res.body.message).to.be.eq("article created")
          })
     })

     describe("UPDATE ARTICLE", () => {
          it("it should update article", async() => {
               let newArticle = new dbSchema({
                    title: "updating article",
                    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
               })

               await newArticle.save()
               const token = await generateToken({id: testSchema._id})
               const id = testSchema._id
               const res = await chai.request(app).patch("/api/v1/articles/" + id)
               .set({"Authorization": `Bearer ${token}`})
               .send(newArticle)
               chai.expect(res.status).to.be.eq(202)
          })

          it("it should not update article on wrong route", async() => {
               let newArticle = new dbSchema({
                    title: "updating article",
                    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
               })

               await newArticle.save()
               const token = await generateToken({id: testSchema._id})
               const id = testSchema._id
               const res = await chai.request(app).patch("/api/v1/articl/" + id)
               .set({"Authorization": `Bearer ${token}`})
               .send(newArticle)
               chai.expect(res.status).to.be.eq(404)
          })

          it("it should delete the article", async() => {
               const token = await generateToken({id: testSchema._id})
               const id = testSchema._id
               const res = await chai.request(app).delete("/api/v1/articles/" + id)
               .set({"Authorization": `Bearer ${token}`})
               chai.expect(res.status).to.be.eq(202)
               chai.expect(res).to.have.property("error")
          })
     })


     describe("ARTICLE COMMENTS", () => {
          it("it should test name validation", async() => {
               let commentTest = new commentSchema({
                    name: "",
                    content: "i like this article"
               })
               await commentTest.save()
               const res = await chai.request(app).post("/api/v1/articles/" + testSchema._id + "/addComment")
               .send(commentTest)
               chai.expect(res.status).to.be.eq(400)
               chai.expect(res.body.error).to.be.eq("Name is required!!!")
          })

          it("it should test content validation", async() => {
               let commentTest = new commentSchema({
                    name: "gabin",
                    content: ""
               })
               await commentTest.save()
               const res = await chai.request(app).post("/api/v1/articles/" + testSchema._id + "/addComment")
               .send(commentTest)
               chai.expect(res.status).to.be.eq(400)
               chai.expect(res.body.error).to.be.eq("Content required!!!")
          })

          it("it should create a comment", async() => {
               // let commentTest = new commentSchema({
               //      name: "gabin",
               //      content: "nice article"
               // })
               // await commentTest.save()
               const res = await chai.request(app).post("/api/v1/articles/" + testSchema._id + "/addComment")
               .send({
                    name: "gabin",
                    content: "nice article"
               })
               chai.expect(res.status).to.be.eq(202)
          })
     })

     describe("DELETE COMMENTS", () => {
          
          it("it should delete all comments", async() => {
               const token = await generateToken({id: testSchema._id})
               const res = await chai.request(app).delete("/api/v1/articles/" + testSchema._id + "/deleteComments")
               .set({"Authorization": `Bearer ${token}`})
               // console.log(res.body)
               chai.expect(res.status).to.be.eq(202)
               // chai.expect(res.body.message).to.be.eq("there are no comments")
          })

          it("it should check that there are no comments to delete", async() => {
               const token = await generateToken({id: testSchema._id})
               const res = await chai.request(app).delete("/api/v1/articles/" + testSchema._id + "/deleteComments/")         
               .set({"Authorization": `Beare ${token}`})
               chai.expect(res.status).to.be.eq(205)
               chai.expect(res.body.message).to.be.eq("there are no comments")
          })
     })
})
