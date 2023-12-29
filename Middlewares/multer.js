// const multer = require("multer");
// const path = require("path");
// const fileFilter = (req, file, cb) => {
//     const allowedMimeTypes = [
//       "image/jpeg",
//       "image/jpg",
//       "image/png",
//       "image/gif",
//       "image/webp",
//       "image/avif",
//     ];

//     if (allowedMimeTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       const err = new multer.MulterError();
//       err.code = "CUSTOM_FILE_TYPE_LIMIT";
//       err.message = "Only jpeg, jpg, png, avif, and gif images are allowed";
//       return cb(err, false);
//     }
//   };

// //image upload
// const uploadImage = (path) => {
//   try {

//     console.log(path, "Multer image upload!!!!!!!");
//     const storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         console.log(path,")))))))))MULTER!!");
//         cb(null, path);
//       },
//       filename: function (req, file, cb) {
//         const originalname = path.parse(file.originalname);
//         cb(null, `${originalname.name}_${Date.now()}${originalname.ext}`);
//     },

//     });
//     return multer({ storage: storage, fileFilter }).fields([{ name: 'image', maxCount: 1 }]);
//   } catch (error) {
//     console.log(error,"Multer error!!!");
//   }
//   };

// module.exports = { uploadImage };

const multer = require("multer");
const path = require("path");

// Multer (file upload setup)
//creating multer instance based on destination folder
const createMulterInstance = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/images/${folderName}`);
    },
    filename: (req, file, cb) => {
      const originalname = path.parse(file.originalname);
      cb(null, `${originalname.name}_${Date.now()}${originalname.ext}`);
    },
  });
  return multer({ storage: storage });
};

module.exports = createMulterInstance;
