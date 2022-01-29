import mongoose from mongoose

const queryModel = mongoose.schema({
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
          type:date,
          default: Date.now()
     }
     
})

export default mongoose.model("queryModel", queryModel)