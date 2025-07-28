const { imageUploadUtils } = require("../../config/cloudinary");
const Products = require("../../models/product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtils(url);
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error occured",
    })
  }
}
const addProduct = async (req, res) => {
  try {
    const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
    const newlyCreatedProduct = new Products({
      image, title, description, category, brand, price, salePrice, totalStock
    });
    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    })
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Some Error Ocurred",
    })
  }
}

const fetchAllProduct = async (req, res) => {
  try {
    const listOfProducts = await Products.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    })
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    })
  }
}
let editProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
    const findProduct = await Products.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      })
    }
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === '' ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    await findProduct.save();
    res.status(200).json({
      success: true,
      findProduct,
    })

  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Some Error Ocurred",
    })
  }
}
const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      })
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    })
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Some Error Ocurred",
    })
  }
}
module.exports = { handleImageUpload, addProduct, fetchAllProduct, editProductById, deleteProductById };