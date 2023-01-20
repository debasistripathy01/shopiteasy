const express=require("express");

const ProductModel = require("../models/product.model");



const getProductById =async(req, res)=>{

    const {productID} = req.param;

    const product = await ProductModel.find({_id: productID});

    return res.send({ data: product, status: "Got Product "});


}


const createProduct =async(req, res)=>{
    const product = req.body;

    const prodData = await ProductModel.create(product);
    return res.send({data: prodData, status:"Added Prod Success"})
}

const getProductDetailsByID =async(req, res)=>{
    const { id } = req.params;

    const prodData = await ProductModel.find({_id: id});
    return res.send({data: prodData, status: "Got the Product data"});
}


module.exports={ getProductById, getProductDetailsByID, createProduct}