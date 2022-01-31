import mongoose from "mongoose"

const userModel = mongoose.Schema({
     email: {
          type: String
     },

     password: {
          type: String
     }
})