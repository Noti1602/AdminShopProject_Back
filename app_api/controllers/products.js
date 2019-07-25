const Product = require('../models/products');

const sendJSONResponse = (res, status, content) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(status).json(content);
};

module.exports.getProducts = function (req, res) {
    const filter = {};
    Product.find(filter)
        .exec((err, products) => {
            if (err) {
                return sendJSONResponse(res, 404, {message: "Products not found"});
            }
            if (!products.length) {
                sendJSONResponse(res, 404,
                    {message: "Products not found (empty)"});
                return
            }
            sendJSONResponse(res, 200, products)
        })
};
module.exports.getProductById = function (req, res) {

    if (req.params && req.params.productid) {
        Product.findById(req.params.productid, (err, product) => {
                if (err) {
                    sendJSONResponse(res, 404,
                        {
                            message: 'Product not found'
                        });
                    return
                }
                sendJSONResponse(res, 200, product)
            })
    }
};
module.exports.addProduct=function(req,res){
    if(!req.body ||!req.body.name ||!req.body.description ||!req.body.price ||!req.body.count) {
        sendJSONResponse(res, 400, {
            message: req.body
        })
        return
    }
    const newProduct=new Product({
        name:req.body.name,
        description:req.body.description,
        image: `/imgs/${req.file.filename}`,
        price:req.body.price,
        count:req.body.count
    })
    newProduct.save((err)=>{
        if(err){
            sendJSONResponse(res,500,{
                message:err
            })
            return
        }
        res.redirect('http://localhost:3000/adminproductslist');


    })
};

module.exports.updateProduct = function (req, res) {
     Product.findByIdAndUpdate(req.params.productid,
        {
            $set: {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                count: req.body.count,
                image: `/imgs/${req.file.filename}`
            }
        },
        (err, product) => {
            if (err) {
                return sendJSONResponse(res, 404, {message: 'Product not found'});
            }

            if (!product) {
                return next(new Error('product not found'));
            }
    res.redirect('http://localhost:3000/adminproductslist');

        }
   
    )

};
module.exports.deleteProduct = function (req, res) {
    if (req.params.productid) {
        Product.findByIdAndDelete(req.params.productid, (err) => {
            if (err) {
                sendJSONResponse(res, 500, {
                    message: "can't delete"
                });
                return

            }
            
            res.send('http://localhost:3000/adminproductslist');
        })
    } else
        sendJSONResponse(res, 400, {
            message: 'bad request'
        })
};
