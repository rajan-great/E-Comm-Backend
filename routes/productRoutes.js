const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct } = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');

router.get('/', getAllProducts);
router.post('/', auth, addProduct);

module.exports = router; 