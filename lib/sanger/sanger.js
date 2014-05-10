var Product                 = require('../../app/models/sanger/product'),
    elasticPrefix          = 'sanger/v1/products';

exports.get = function(req, callback){
    var defaultValue = [];
    getDocFromDb(req, Product, elasticPrefix, callback, defaultValue);
};

exports.new = function(req, callback){
    var productData = req.body[SANGER['product_data']];
    var product     = new Product(productData);

    createNewAndIndex(product, productData, elasticPrefix, onSuccessfulSave, callback);
};

exports.update = function(req, callback){
    var productNewData = req.body[SANGER['product_data']];

    updateDocAndIndex(Product, req, productNewData, elasticPrefix, onSuccessfulUpdate, callback);
};

exports.delete = function(req, callback){
    //TODO
};