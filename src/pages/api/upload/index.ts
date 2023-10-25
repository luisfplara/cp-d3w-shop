import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"
import { NextApiRequest, NextApiResponse } from "next"
import { Formidable } from "formidable"

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const uploadImg = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new Formidable()
  const data = await form.parse(req)
  const files = data[1]
  const responseImagesUrl: { url: string }[] = []
  const responseError: unknown[] = []

  files?.image?.map(async (images) => {
    try {
      const saveImage = await cloudinary.uploader.upload(images.filepath)
      responseImagesUrl.push({ url: saveImage.url })
    } catch (error) {
      responseError.push(error)
    }
  })

  /* 
  if (files.image) {
    for (const images of files.image) {
      try {
        const save_image = await cloudinary.uploader.upload(images.filepath)
        responseImagesUrl.push({ url: save_image.url })
      } catch (error: any) {
        responseError.push(error)
      }
    } 
  } */

  res.status(200).send({ uploads: responseImagesUrl, error: responseError })
}

export default uploadImg
