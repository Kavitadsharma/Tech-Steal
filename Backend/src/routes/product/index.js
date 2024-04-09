const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {adminAuth}=require('../../middleware/auth')
const ProductController = require('./product.controller');

router.get('/', ProductController.findAllProducts());
router.post('/add',upload.array('files',2),ProductController.createProduct());
router.post('/update/:id',adminAuth, ProductController.updateProductById());
router.delete('/delete/:id',adminAuth, ProductController.deleteProductById());
// router.post('/upload',adminAuth, upload.single('image'), ProductController.uploadImage());
router.get('/:id', ProductController.getOneProduct());
router.post('/cloud',upload.single('file'),ProductController.cloudinary())


module.exports = router;
