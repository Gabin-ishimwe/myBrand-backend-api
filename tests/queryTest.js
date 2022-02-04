import chai from "chai"
import chaiHttp from "chai-http"
import app from "../src/app"
import queryModel from "../src/models/query";
import { generateToken } from "../src/helpers/jwtFunction";

chai.use(chaiHttp)


describe("QUERIES END POINTS", () => {
     let testSchema = new queryModel({
          name: "ishimwe",
          email: "gabin@gmail.com",
          message: "lorem ispum",
          location: "kigali"
     })
     before(async() => {
          await testSchema.save()
     })

     describe("RETREIVE ALL QUERIES", () => {
          it("it will get all queries", async () => {
               const token = await generateToken({id: testSchema._id})
               const res = await chai.request(app).get("/api/v1/queries/")
               .set({"Authorization": `Bearer ${token}`})
               chai.expect(res.body).to.be.a("array")
               chai.expect(res.status).to.be.eq(202)
          })
          it("it won't get all queries on wrong route", async () => {
               const res = await chai.request(app).get("/api/v1/queri/")
               chai.expect(res.status).to.be.eq(404)
          })
     })

     describe("GET ONE QUERY BY ID", () => {
          it("it should get one query by id", async () => {
               const token = await generateToken({id: testSchema._id})
               console.log(testSchema._id)
               const res = await chai.request(app).get("/api/v1/queries/getOne/" + testSchema._id)
               .set({"Authorization": `Bearer ${token}`})
               chai.expect(res.body).to.have.property("_id")
          })

          it("it should not get any query without authentication", async () => {
               const res = await chai.request(app).get("/api/v1/queries/getOne/" + testSchema._id)
               chai.expect(res.status).to.be.eq(401)
               chai.expect(res.error.text).to.be.eq("Access denied!!!")
          })
     })

     describe("CREATE QUERY", () => {
          it("it should not create query without name", async () => {
               const res = await chai.request(app).post("/api/v1/queries/")
               .send({
                    name: "",
                    email: "gabin@gmai.com",
                    message: "nice to meet you",
                    location: "kanombe"
               })
               chai.expect(res.status).to.be.eq(400)
               chai.expect(res.body.error).to.be.eq("Name is required!!!")

          })

          it("it should not create query with out email", async() => {
               const res = await chai.request(app).post("/api/v1/queries/")
               .send({
                    name: "gabin",
                    email: "",
                    message: "nice to meet you",
                    location: "kanombe"
               })
               chai.expect(res.status).to.be.eq(400)
               chai.expect(res.body.error).to.be.eq("Email is required!!!")
          })

          it("it should not create query without message", async () => {
               const res = await chai.request(app).post("/api/v1/queries/")
               .send({
                    name: "gabin",
                    email: "gabin@gmai.com",
                    message: "",
                    location: "kanombe"
               })
               chai.expect(res.status).to.be.eq(400)
               chai.expect(res.body.error).to.be.eq("Message is required!!!")
          })
     })

     describe("DELETE QUERY", () => {
          it("it should delete one query", async() => {
               const token = await generateToken({id: testSchema._id})
               const res = await chai.request(app).delete("/api/v1/queries/delete/" + testSchema._id)
               .set({"Authorization": `Bearer ${token}`})
               chai.expect(res.status).to.be.eq(202)
               chai.expect(res.body.message).to.be.eq("query deleted")
          })

          it("it should not delete on wrong route", async() => {
               const token = await generateToken({id: testSchema._id})
               const res = await chai.request(app).delete("/api/v1/queries/dele/" + testSchema._id)
               .set({"Authorization": `Bearer ${token}`})
               chai.expect(res.status).to.be.eq(404)
               chai.expect(res).have.property("error")
          })
     })
})