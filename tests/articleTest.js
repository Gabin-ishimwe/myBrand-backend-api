import chai from "chai"
import chaiHttp from "chai-http"
import app from "../src/app"
import dbSchema from "../src/models/article"
import { generateToken } from "../src/helpers/jwtFunction";
import commentSchema from "../src/models/comment"

chai.use(chaiHttp)

describe("ARTICLES", () => {
     let testSchema = new dbSchema ({
               title: "Test article",
               content: "Lorem ipsum",
               image: "URL",
               comments: [],
               likes: 0
          })
     before(async () => {
          await testSchema.save()
          
     })

     // afterEach(async(done) => {
     //      await dbSchema.clear((err) => {
     //           if (err) console.log(error)
     //      })
     //      done()
     // })

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

           it("it should not post without image", async () => {
               const token = await generateToken({id: testSchema._id})
               const res = await chai.request(app).post("/api/v1/articles/")
               .set({"Authorization": `Bearer ${token}`})
               .send({
                    title: "created article", 
                    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    image:"",
                    comments: [],
                    likes: 0

               })
               // console.log(res)
               chai.expect(res.status).to.be.eq(400)
               chai.expect(res.body.errorMessage).to.be.eq("Image is required!!!")
          })
     })

     // describe("UPDATE POST", () => {
     //      it("update existing post", async () => {
     //           const id = testSchema._id
     //           const token = await generateToken({id: testSchema._id})
     //           const res = await chai.request(app).patch("/api/v1/articles/" + id)
     //           .set({"Authorization": `Bearer ${token}`})
     //           .send({
     //                title: "update this article",
     //           })
     //           // console.log(res)
     //           chai.expect(res.body.message).to.eq("article updated!!!")

     //      })
     // })

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
     })

     describe("DELETE COMMENTS", () => {
          it("it should check that there are no comments to delete", async() => {
               let commentTest = new commentSchema({
                    name: "gabin",
                    content: "nice article"
               })
               await commentTest.save()
               const token = await generateToken({id: testSchema._id})
               const res = await chai.request(app).delete("/api/v1/articles/" + testSchema._id + "/deleteComments")
               .send(commentTest)
               .set({"Authorization": `Beare ${token}`})
               chai.expect(res.status).to.be.eq(205)
               chai.expect(res.body.message).to.be.eq("there are no comments")
          })

          it("it should check that there are no comments to delete", async() => {
               let commentTest = new commentSchema({
                    name: "gabin",
                    content: "nice article"
               })
               await commentTest.save()
               const token = await generateToken({id: testSchema._id})
               const res = await chai.request(app).delete("/api/v1/articles/" + testSchema._id + "/deleteOneComment/"+ 0)
               .send(commentTest)
               .set({"Authorization": `Beare ${token}`})
               chai.expect(res.status).to.be.eq(205)
               chai.expect(res.body.message).to.be.eq("there are no comments")
          })
     })
})
