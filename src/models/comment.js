import mongoose from "mongoose"

const commentSchema = mongoose.Schema({
     name: {
          type: String,
     },

     content: {
          type: String,
     },

     date: {
          type: Date,
          default: Date.now()
     }
})

export default mongoose.model("commentSchema", commentSchema)