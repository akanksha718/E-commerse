const express = require('express');
const router = express.Router();
const { handleImageUpload ,addProduct,editProductById,deleteProductById,fetchAllProduct} = require('../../controllers/admin/productscontroler');
const { upload } = require('../../config/cloudinary');

router.post('/upload-image', upload.single("my_file"), handleImageUpload);
router.post('/add',addProduct);
router.put("/edit/:id",editProductById);
router.delete('/delete/:id',deleteProductById);
router.get('/get',fetchAllProduct);

module.exports = router; // ✅ This line is crucial
