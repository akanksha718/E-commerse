const express = require('express');
const router = express.Router();
const { handleImageUpload ,addProduct,editProduct,deleteProduct,fetchAllProducts} = require('../../controllers/admin/productscontroler');
const { upload } = require('../../config/cloudinary');

router.post('/upload-image', upload.single("my_file"), handleImageUpload);
router.post('/add',addProduct);
router.put("/edit/:id",editProduct);
router.delete('/delete/:id',deleteProduct);
router.get('/get',fetchAllProducts);

module.exports = router; 
