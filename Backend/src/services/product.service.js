const Product = require('../models/product');
const {uploadFiles}=require ("../services/cloudinary.js")

class ProductService {
  constructor() {
    this.model = Product;
   
  }

  async findAllProducts() {
    const products = await this.model.find();

    return { data: products };
  }

  async createProduct(  title, description, price,salePrice,files,categories,dealOfDay,Brand,bestSeller) {
   
    const image=[]
    if (Array.isArray(files)) {
      for (const images of files) {
        const result = await uploadFiles(images);
          image.push({ public_id: result.public_id, url: result.secure_url });
          
      }
  }
   
      
    
    const product = await this.model.create({title, description, price,salePrice,image,categories,dealOfDay,Brand,bestSeller});
    return product;
  }

  async updateProductById(id, productUpdates) {
    const product = await this.model.findByIdAndUpdate({ _id: id });
    if (!product) {
      throw new Error('Product not found.');
    }
    product.title = productUpdates.title;
    product.imageUrl=productUpdates.imageUrl;
    product.description = productUpdates.description;
    product.price = productUpdates.price;
    product.salePrice = productUpdates.salePrice;
    await product.save();
    return product;
  }

  async deleteProductById(id) {
    const product = await this.model.findByIdAndDelete(id);
    return { data: product };
  }

  async getOneProduct(id) {
    const product = await this.model.findOne({ _id: id });
    return { data: product };
  }
}

module.exports = new ProductService(Product);
