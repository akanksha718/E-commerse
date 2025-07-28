const express = require('express');
const router = express.Router();
const { getFilterProduct, getProductsDetail } = require('../../controllers/shop/products-controller');
router.get("/get", getFilterProduct);
router.get("/get/:id", getProductsDetail);

module.exports = router; // ✅ This line is crucial