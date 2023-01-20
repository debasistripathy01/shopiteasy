const mongoose=require("mongoose");
const ProductSchema=mongoose.Schema({
    image:String,
    title:String,
    description:String,
    price:String,
    category:String,
    type: String,
    productType: String
});
const ProductModel=mongoose.model("products",ProductSchema);
module.exports={ProductModel};