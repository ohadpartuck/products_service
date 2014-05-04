var Product                 = require('../../app/models/sanger/product'),
    helper                  = require('../../app/helpers/main/helper'),
    sanger_helper           = require('../../app/helpers/sanger/helper'),
    postman                 = require('../../lib/helpers/postman'),
    elastic_prefix          = 'sanger/v1/products',
    skip_elastic            = MAIN_CONFIG['skip_elastic_searcher'];


exports.get = function(req, callback){

    if (skip_elastic) return queryTheDb(req, callback);
    else              return queryElasticSearcher(req, callback);
};

exports.new = function(req, callback){
    var productData = req.body[SANGER['product_data']];
    var product     = new Product(productData);

    createNewAndIndex(product, productData, onSuccessfulSave, callback);
};

exports.update = function(req, callback){
    var productNewData = req.body[SANGER['product_data']];

    updateDocAndIndex(Product, req, productNewData, onSuccessfulUpdate, callback);
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

function onSuccessfulUpdate(product){
    console.log('Time Now ' + helper.time_now() + 'onSuccessfulUpdate done! saved ' + product);
    if (!skip_elastic) updateInElastic(product);
}

function afterFind(error, products, callback){
    helper.generic_handler(error,  products, function(products){
        console.log('done finding , found ' + products);
        callback.json(products);
    });
}

function indexInElastic(product){
    var payload  = gather_input(product);

    //TODO - fill in here. put to elastic searcher
    postman.put('elastic_searcher',
                    elastic_prefix,
                    payload,
                    genericOnElasticError,
                    onElasticIndexSuccess);
}

function updateInElastic(product){
    var new_product  = gather_input(product);

    postman.post('elastic_searcher',
        elastic_prefix + '/' + new_product[MAIN['bson_id']] ,
        new_product,
        genericOnElasticError,
        onElasticIndexSuccess);
}


function genericOnElasticError(url, error){
    //TODO send errors to graylog
    console.log({no_results: true, url: url, error: error});
}

function onElasticIndexSuccess(url, response){
    genericOnElasticSuccess(url, response);
}

function genericOnElasticSuccess(url, response){
    console.log('success response from ' + url + '. response is ' + response);
}

function gather_input(product){
    var payload                         = {},
        doc                             = product._doc;

    payload[SANGER['product_data']]     = doc;
    payload[MAIN['bson_id']]            = doc._id.toString();
    return payload;
}


