var express             = require('express'),
    router              = express.Router(),
    sanger              = require('../../lib/sanger/sanger'),
    helper              = require('../../app/helpers/main/helper');


module.exports = function (app, namespace) {
    //TODO - this is sync, check if async will be better.
    router.get('/', function(req, res) {
        sanger.get(req, res);
    });

    router.put('/new', function(req, res) {
        sanger.create(req, general_callback);
        res.json({'result': 'sent to be created' + helper.time_now(),
                  'indexed': MAIN_CONFIG['skip_elastic_searcher']});
    });

    router.post('/:id', function(req, res) {
        sanger.update(req, general_callback);
        res.json({'result': 'sent to be updated and re-indexed'});
    });

    router.delete('/:id', function(req, res) {
        sanger.delete(req, general_callback);
        res.json({'result': 'sent to be deleted'});
    });

    app.use(namespace + '/v1', router);
};

function general_callback(params){
    console.log('general callback got ' + JSON.stringify(params) + ' at ' + helper.time_now());
}