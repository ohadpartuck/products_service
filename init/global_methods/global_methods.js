var skip_elastic            = MAIN_CONFIG['skip_elastic_searcher'];

onSuccessfulSave = function(product, elastic_prefix){
    console.log('Time Now ' + timeNow() + 'onSuccessfulSave done! saved ' + product);
    if (!skip_elastic) indexInElastic(product, elastic_prefix);
};

onSuccessfulUpdate = function(product, elastic_prefix){
    console.log('Time Now ' + timeNow() + 'onSuccessfulUpdate done! saved ' + product);
    if (!skip_elastic) updateInElastic(product, elastic_prefix);
};

afterFind = function(error, products, callback){
    genericHandler(error,  products, function(products){
        console.log('done finding , found ' + products);
        callback.json(products);
    });
};

gatherInput = function(product){
    var payload                         = {},
        doc                             = product._doc;

    payload[SANGER['product_data']]     = doc;
    payload[MAIN['bson_id']]            = doc._id.toString();
    return payload;
};

genericHandler = function(error, product, elastic_prefix, onSuccess){
    if (error){
        console.log('generic_error' + error);
    }else{
        onSuccess(product, elastic_prefix);
    }
};

timeNow = function(){
    return new Date;
};

genericCallback = function(params){
    console.log('general callback got ' + JSON.stringify(params) + ' at ' + timeNow());
};

require('./mongo_methods');
require('./elastic_methods');