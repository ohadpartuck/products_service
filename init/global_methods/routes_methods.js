var express             = require('express'),
    router              = express.Router();

setupDefaultsRoutes = function(appLib){

    var get             = appLib.get;
    var put             = appLib.new;
    var update          = appLib.post;
    var deleteItem      = appLib.delete;

    //TODO - this is sync, check if async will be better.
    router.get('/', function(req, res) {
        get.call(this, req, res);
    });

    router.put('/', function(req, res) {
        put.call(this, req, genericCallback);
        res.json({'result': 'sent to be created' + timeNow(),
            'indexed': !MAIN_CONFIG['skip_elastic_searcher']});
    });

    router.post('/:id', function(req, res) {
        update.call(this, req, genericCallback);
        res.json({'result': 'sent to be updated and re-indexed'});
    });

    router.delete('/:id', function(req, res) {
        deleteItem.call(this, req, genericCallback);
        res.json({'result': 'sent to be deleted'});
    });

    return router;
};
