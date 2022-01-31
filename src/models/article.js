import file from "@babel/core/lib/transformation/file/file"
import mongoose from "mongoose"

const dbSchema = mongoose.Schema({
     title: {
          type: String
     },
     // "img": Blob,
     content: {
          type: String
     },

     image: {
          type: String,
          require: true
     },

     comments: {
          type: Array,
     },
     likes: {
          type: Number,
          default: 0
     },

     author: {
          type: String,
          default: "Gabin Ishimwe"
     },
     date: {
          type: Date,
          default: Date.now()
     }
}) 

export default mongoose.model("dbSchema", dbSchema)