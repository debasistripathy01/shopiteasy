const mongoose=require("mongoose");
const wishSchema=mongoose.Schema({
    productID:String,
    image:String,
    title:String,
    description:String,
    price:String,
    category:String,
    userID:String
});
const WishModel=mongoose.model("wishlist",wishSchema);
module.exports=WishModel;