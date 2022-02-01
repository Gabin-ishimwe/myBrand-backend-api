import mongoose from "mongoose"

const userModel = mongoose.Schema({
     name: {
          type: String
     },

     email: {
          type: String
     },

     password: {
          type: String
     }
})

export default mongoose.model("userModel", userModel)