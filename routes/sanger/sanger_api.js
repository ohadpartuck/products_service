var express             = require('express'),
    router              = express.Router(),
    sanger              = require('../../lib/sanger/sanger');


module.exports = function (app, namespace) {
    //TODO - this is sync, check if async will be better.
    router.get('/', function(req, res) {
        sanger.get(req, res);
    });

    router.put('/', function(req, res) {
        sanger.new(req, genericCallback);
        res.json({'result': 'sent to be created' + timeNow(),
                  'indexed': !MAIN_CONFIG['skip_elastic_searcher']});
    });

    router.post('/:id', function(req, res) {
        sanger.update(req, genericCallback);
        res.json({'result': 'sent to be updated and re-indexed'});
    });

    router.delete('/:id', function(req, res) {
        sanger.delete(req, genericCallback);
        res.json({'result': 'sent to be deleted'});
    });

    app.use(namespace + '/v1', router);
};
