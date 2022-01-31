import cloudinary from "cloudinary"

export const uploading = async(req, res) => {
     let imageUrl = ""
     console.log("imaging uploading")
     await cloudinary.v2.uploader.upload(req.file.path, (error, image) => {
          if (error) {
               console.log(error)
               res.send(error)
          } else {
               imageUrl = image.url
          }
     })
     console.log(imageUrl)
     return imageUrl
     
}