const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: [
    {
        public_id: {
            type: String,
            required: [true, "Public ID is required"],
        },
        url: {
            type: String,
            required: [true, "URL is required"],
        }
    }
],
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories:{type:String,required:true},
  price: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  dealOfDay:{type:Boolean,default:false},
Brand:{type:String},
newForYou:{type:Boolean,default:false},
bestSeller:{type:Boolean,default:false}

});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
