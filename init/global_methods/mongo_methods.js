var skip_elastic            = MAIN_CONFIG['skip_elastic_searcher'];

createNewAndIndex = function(modelObj, productData, elastic_prefix, onSuccessfulSave, callback){
    modelObj.save(function(error,  product, numberAffected){
        genericHandler(error, product, elastic_prefix, onSuccessfulSave);
    });

    callback({data: 'Ok. i\'ll create and index.', product_data: productData});
};

updateDocAndIndex = function(model, req, productNewData, elastic_prefix, onSuccessfulUpdate, callback){
    model.findOne({ _id: req.params['id'] }, function (err, doc){
        for (var key in productNewData) {
            doc._doc[key] = productNewData[key];
        }
        doc.save(function(error,  product, numberAffected){
            genericHandler(error, product, elastic_prefix, onSuccessfulUpdate);
        });
    });

    callback({data: 'Ok. i\'ll update and re-index.', product_data: productNewData});
};


getDocFromDb = function(req, model, elastic_prefix, callback, defaultValue){
    if (skip_elastic) {
        var db_query = buildDbQuery(req.query);
        return queryTheDb(req, db_query, Product, callback);
    }else{
        return queryElasticSearcher(req, elastic_prefix, callback, defaultValue);
    }
};


queryTheDb = function(req, db_query, model, callback){
    //TODO this should send to find and release the request. now it's blocking.
    model.find(db_query, function(error,  products){
        afterFind(error, products, callback)
    });
};

buildDbQuery = function(queryFromUrl){
    var searchTerm = {};

    for (var key in queryFromUrl) {
        if (queryFromUrl.hasOwnProperty(key)) {
            searchTerm[key] = queryFromUrl[key];
        }
    }

    return searchTerm;
};