import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";
import { Fields, Files, Formidable } from "formidable";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new Formidable();
  const data = await form.parse(req);
  const files = data[1];
  console.log('console.log(data);console.log(data);');
  console.log(files);

  var response_images_url = [];
  var response_error = [];
  if (files["ImagesInput"]) {
    for (var images of files["ImagesInput"]) {
      console.log('imagesimagesimages');
      console.log(images);
      try {
        const save_image = await cloudinary.uploader.upload(images.filepath);
        response_images_url.push({ url: save_image.url });
      } catch (error: any) {
        response_error.push(error);
      }
    }
  }
  res.status(200).send({uploads: response_images_url,  error: response_error});
};
/*

export default async (req, res) => {
const aa = await req.;
  console.log('FORMDATA', aa)
  const form = new formidable.IncomingForm();

  form.uploadDir = "./";
  form.keepExtensions = true;
  await form.parse(req, (err, fields, files) => {
    console.log("Files",files)
    cloudinary.uploader.upload(files.image.path, function(error, result) {
      console.log("Result", result);
      res.status(200).json({
        success: true,
        data: result.secure_url
      })
    });
  });
}*/
