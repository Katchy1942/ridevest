import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = 'uploads/logos';

if (!fs.existsSync(uploadDir)) {
   fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, uploadDir);
   },
   filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, `${uniqueSuffix}${ext}`);
   }
});

const fileFilter = (req, file, cb) => {
   if (file.mimetype.startsWith('image/')) {
      cb(null, true);
   } else {
      cb(new Error('Only image files are allowed!'), false);
   }
};

export const uploadLogo = multer({ storage, fileFilter });
