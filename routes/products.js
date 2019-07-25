const express = require('express');
var multer = require('multer');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/imgs')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname)
    }
});

var upload = multer({ storage: storage })

const router = express.Router();
const ctrProducts = require('../app_api/controllers/products');

router.get('/', ctrProducts.getProducts);
router.get('/products/:productid', ctrProducts.getProductById);
router.post('/products', urlencodedParser, upload.single('image'), ctrProducts.addProduct);
router.post('/products/edit/:productid', upload.single('image'), ctrProducts.updateProduct);
router.delete('/products/:productid', ctrProducts.deleteProduct);

module.exports = router;

