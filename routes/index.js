var express = require('express');
var createError = require('http-errors');

var router = express.Router();



module.exports = () => {
    const products = require('./products');

    router.use('/products', products);


    router.use(function (req, res, next) {
        next(createError(404));
    });


    router.use(function (err, req, res, next) {

        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};


        res.status(err.status || 500);
        res.render('error');
    });

return router;
}
