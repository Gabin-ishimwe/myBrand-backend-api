import mongoose from "mongoose"

const commentSchema = mongoose.Schema({
     // articleId: {
     //      type: String,
     // },

     content: {
          type: String,
     },

     date: {
          type: Date,
          default: Date.now()
     }
})

export default mongoose.model("commentSchema", commentSchema)