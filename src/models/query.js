import mongoose from "mongoose"

const queryModel = mongoose.Schema({
     name: {
          type: String
     },

     email: {
          type: String
     },

     message: {
          type: String
     },

     location: {
          type: String,
     },

     date: {
          type:Date,
          default: Date.now()
     }
     
})

export default mongoose.model("queryModel", queryModel)