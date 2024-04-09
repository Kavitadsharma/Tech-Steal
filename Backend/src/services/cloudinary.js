
//   const { v4: uuidV4 } = require('uuid');
// const cloudinary = require('cloudinary').v2;
// const { gEnv } = require('../utils/env');

// cloudinary.config({
//   cloud_name: 'dic8gep25',
//   api_key: '612855668498215',
//   api_secret:'NYfvyOrcwXSyhRGnkE9-flP5xtQ',
// });

// async function uploadFiles(file) {
//   if (!file) {
//     throw new Error('No file provided.');
//   }

//   const fileName = `${uuidV4()}.${file.originalname.split('.')[1]}`;
// console.log(fileName)
//   const uploadOptions = {
//     folder:fileName, // Specify the folder in Cloudinary
//   };

//   try {
//     const result = await cloudinary.uploader.upload(uploadOptions, (error, result) => {
//       if (error) {
//         console.error(error);
//         throw new Error('Failed to upload file to Cloudinary');
//       }
//       return result;
//     }).end(file.buffer);

//     return result;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to upload file to Cloudinary');
//   }
// }

// exports.uploadFiles = uploadFiles;
const { v4: uuidV4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { gEnv } = require('../utils/env');

cloudinary.config({
  cloud_name: 'dic8gep25',
  api_key: '612855668498215',
  api_secret: 'NYfvyOrcwXSyhRGnkE9-flP5xtQ',
});

async function uploadFiles(images) {
  if (!images) {
    throw new Error('No file provided.');
  }

  const fileName = `${uuidV4()}.${images.originalname.split('.')[1]}`;


  const uploadOptions = {
    folder: 'trial',
    public_id: fileName,
  };

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) {
        console.error(error);
        reject(new Error('Failed to upload file to Cloudinary'));
      } else {
       
        resolve(result);
      }
    });

    streamifier.createReadStream(images.buffer).pipe(stream);

  });
}






exports.uploadFiles = uploadFiles;
