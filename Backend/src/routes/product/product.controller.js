const ProductService = require('../../services/product.service');
const BaseController = require('../base.controller.js');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const {uploadFiles}=require('../../services/cloudinary.js')

class ProductController extends BaseController {
  constructor() {
    super();
    this.service = ProductService;
  }
  findAllProducts() {
    return this.asyncWrapper(async (req) => {
      const products = await this.service.findAllProducts();

      return { data: products };
    });
  }
  createProduct() {
    return this.asyncWrapper(async (req) => {
      const {title, description, price,salePrice,categories,dealOfDay,Brand,bestSeller } = req.body;
      const files =req.files
      if (!files || files.length === 0) {
        return res.status(400).json({ message: 'Missing files in the request' });
      }
      console.log(files)
  
      const product = await this.service.createProduct(title, description, price,salePrice,files,categories,dealOfDay,Brand,bestSeller);
      return {
        data:product,
        message: 'product create',
      };
    });
  }
  updateProductById() {
    return this.asyncWrapper(async (req) => {
      const { id } = req.params;
      const productUpdates = req.body;
      const product = await this.service.updateProductById(id, productUpdates);
      return {
        data: product,
        message: 'product updated',
      };
    });
  }

 
  cloudinary() {
    return this.asyncWrapper(async (req) => {
      const { file } = req;
     // console.log(file, "file");
  
      if (!file) {
        // Check if a file is provided in the request
        return { message: 'Missing file in the request', http_code: 400 };
      }
  
      const result = await uploadFiles(file);
      console.log(result)
  
      return { message: 'File uploaded', data: { location: result.secure_url, key: result.public_id } };
    });
  }
 

  deleteProductById() {
    return this.asyncWrapper(async (req) => {
      const { id } = req.params;
      const product = await this.service.deleteProductById(id);
      return {
        data: product,
        message: 'product delete',
      };
    });
  }

  getOneProduct() {
    return this.asyncWrapper(async (req) => {
      const { id } = req.params;
      const product = await this.service.getOneProduct(id);

      return {
        data: product,
        message: 'product retrieve',
      };
    });
  }
}
module.exports = new ProductController();
