var Product                 = require('../../app/models/sanger/product'),
    elastic_prefix          = 'sanger/v1/products';

exports.get = function(req, callback){
    var defaultValue = [];
    getDocFromDb(req, Product, elastic_prefix, callback, defaultValue);
};

exports.new = function(req, callback){
    var productData = req.body[SANGER['product_data']];
    var product     = new Product(productData);

    createNewAndIndex(product, productData, elastic_prefix, onSuccessfulSave, callback);
};

exports.update = function(req, callback){
    var productNewData = req.body[SANGER['product_data']];

    updateDocAndIndex(Product, req, productNewData, elastic_prefix, onSuccessfulUpdate, callback);
};

exports.delete = function(req, callback){
    //TODO
};