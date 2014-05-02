var Product                 = require('../../app/models/sanger/product'),
    helper                  = require('../../app/helpers/main/helper'),
    sanger_helper           = require('../../app/helpers/sanger/helper'),
    postman                 = require('../../lib/helpers/postman'),
    elastic_prefix          = 'sanger/v1/products',
    skip_elastic            = GLOBAL.MAIN_CONFIG['skip_elastic_searcher'];


exports.get = function(req, callback){

    if (skip_elastic) return queryTheDb(req, callback);
    else              return queryElasticSearcher(req, callback);
};

exports.create = function(req, callback){
    var product_data = req.body[GLOBAL.SANGER_CONSTATNTS['product_data']];


    var product = new Product(product_data);
    product.save(function(error,  product, numberAffected){
        helper.generic_handler(error,  product, onSuccessfulSave);
    });

    callback({data: 'Ok. i\'ll create and index.', product_data: product_data});
};

exports.update = function(req, callback){

};

exports.delete = function(req, callback){

};

function queryElasticSearcher(req, callback){
    postman.get('elastic_searcher',
                    elastic_prefix + req.url,
                    {},
                    genericOnElasticError,
                    callback);
}

function queryTheDb(req, callback){
    var db_query = sanger_helper.buildDbQuery(req.query);

    //TODO this should send to find and release the request. now it's blocking.
    Product.find(db_query, function(error,  products){
        afterFind(error, products, callback)
    });
}

function onSuccessfulSave(product){
    console.log('Time Now ' + helper.time_now() + 'onSuccessfulSave done! saved ' + product);
    if (!skip_elastic) indexInElastic(product);
}

function afterFind(error, products, callback){
    helper.generic_handler(error,  products, function(products){
        console.log('done finding , found ' + products);
        callback.json(products);
    });
}

function indexInElastic(product){
    //TODO - fill in here. put to elastic searcher
    postman.put('elastic_searcher',
                    elastic_prefix + '/new',
                    {},
                    genericOnElasticError,
                    onElasticIndexSuccess);
}

function genericOnElasticError(url, error){
    //TODO send errors to graylog
    return {no_results: true, url: url, error: error};
}

function onElasticIndexSuccess(url, response){
    genericOnElasticSuccess(url, response);
}

function genericOnElasticSuccess(url, response){
    console.log('success response from ' + url + '. response is ' + response);
}


