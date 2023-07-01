import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = file.originalname.replace(/[^a-zA-Z0-9]/g, "_");
    const ext = path.extname(file.originalname); // M
    cb(null, fileName + "-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  // Filter hanya file gambar
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("image");
