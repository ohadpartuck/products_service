var Product                 = require('../../app/models/sanger/product'),
    helper                  = require('../../app/helpers/main/helper'),
    sanger_helper           = require('../../app/helpers/sanger/helper'),
    skip_elastic            = GLOBAL.MAIN_CONFIG['skip_elastic_searcher'];


exports.get = function(req, callback){

    if (skip_elastic) return queryTheDb(req, callback);
    else              return queryElasticSearcher(req, callback);
};

exports.create = function(req, callback){
    product = new Product(req.body['product_data']);
    product.save(function(error,  product, numberAffected){
        helper.generic_handler(error,  product, onSuccessfulSave);
    });

    callback({data: 'Ok. i\'ll create and index.', product_data: req['product_data']})
};

exports.update = function(req, callback){

};

exports.delete = function(req, callback){

};

function queryElasticSearcher(req, callback){

}

function queryTheDb(req, callback){
    var db_query = sanger_helper.build_db_query(req.query);

    //TODO this should send to find and release the request. now it's blocking.
    Product.find(db_query, function(error,  products){
        afterFind(error, products, callback)
    });
}

function onSuccessfulSave(product){
    console.log('Time Now ' + helper.time_now() + 'onSuccessfulSave done! saved ' + product);
    if (!skip_elastic) index_in_elastic(product);
}

function afterFind(error, products, callback){
    helper.generic_handler(error,  products, function(products){
        console.log('done finding , found ' + products);
        callback.json(products);
    });
}

function index_in_elastic(product){
    //TODO - fill in here. put to elastic searcher
}


