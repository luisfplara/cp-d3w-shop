import { Files, IncomingForm } from "formidable";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm();

  form.parse(req, (err, fields, file) => {
    if (err) return res.json({ error: "error" });
    console.log("fields, file ");
    console.log(fields, file);

    let newFilesLocation: object[] = [];

    file.file?.map((file) => {
      console.log(file.filepath);
      var oldPath = file.filepath;
      var newPath = `./public/images/gemma/${file.originalFilename}`;
      newFilesLocation.push({url : `/public/images/gemma/${file.originalFilename}`});

      mv(oldPath, newPath, function (err: any) {
        console.log("errerrerrerr");
        console.log(err);
        file.filepath = newPath;
      });
    });

    res.status(200).json({ fields, file: newFilesLocation });
  });
};
