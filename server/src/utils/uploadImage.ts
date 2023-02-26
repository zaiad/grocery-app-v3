import { Request, Response } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // specify the directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // generate a unique file name
  },
});

const upload = multer({ storage });

export const uploadImage = (req: Request, res: Response) => {
  // 'image' is the name of the field in the request
  upload.single("image")(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({
        message: "Error uploading file",
        error: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const imageUrl = req.file.path;

    // return the URL of the uploaded image
    return res.status(200).json({ imageUrl });
  });
};
