var postman = require('../../lib/helpers/postman');

queryElasticSearcher = function(req, elastic_prefix, callback){
    postman.get('elastic_searcher',
        elastic_prefix + req.url,
        {},
        genericOnElasticError,
        callback);
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

genericOnElasticError = function(url, error){
    //TODO send errors to graylog
    console.log({no_results: true, url: url, error: error});
};

onElasticIndexSuccess = function(url, response){
    genericOnElasticSuccess(url, response);
};

genericOnElasticSuccess = function(url, response){
    console.log('success response from ' + url + '. response is ' + response);
};
