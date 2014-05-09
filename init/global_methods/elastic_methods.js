var postman = require('rest_postman');

queryElasticSearcher = function(req, elastic_prefix, callback, defaultValue){
    postman.get('elastic_searcher',
        elastic_prefix + req.url,
        {},
        genericOnElasticError,
        callback,
        defaultValue);
};

indexInElastic = function(product, elastic_prefix){
    var payload  = gatherInput(product);

    //TODO - fill in here. put to elastic searcher
    postman.put('elastic_searcher',
        elastic_prefix,
        payload,
        genericOnElasticError,
        onElasticIndexSuccess);
};

updateInElastic = function(product, elastic_prefix){
    var new_product  = gather_input(product);

    postman.post('elastic_searcher',
        elastic_prefix + '/' + new_product[MAIN['bson_id']] ,
        new_product,
        genericOnElasticError,
        onElasticIndexSuccess);
};

genericOnElasticError = function(params, defaultValue){
    //TODO send errors to graylog
    console.log(params);
    return defaultValue;
};

onElasticIndexSuccess = function(url, response){
    genericOnElasticSuccess(url, response);
};

genericOnElasticSuccess = function(url, response){
    console.log('success response from ' + url + '. response is ' + response);
};
