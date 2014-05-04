var    extend                   = require('util')._extend,
    bodyParser               = require('body-parser'),
    global_constants         = require('global_constants');

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    MAIN_CONFIG          = require_settings('main');
    SANGER_CONFIG        = require_settings('sanger');


    SANGER_CONSTATNTS    = global_constants['sanger']['sanger_constants'];

    defineGlobalFunctions();
};


function require_settings(namespace){
    var defaults                = require('../configuration/' + namespace + '/defaults.json'),
        by_env                  = require('../configuration/' + namespace + '/' + ENV + '.json');
    return extend(defaults, by_env);
}

function defineGlobalFunctions(){
    get_doc_id = function (modelName){
        var key     = modelName + '_id_field';
        var _id     = 1;
        $redis_main.get(key, function (err, value) {
            if (value === undefined) {
                $redis_main.set(key, _id);
                value = _id;
            }else{
                $redis_main.incr(key);
            }
            return parseInt(value);
        });
    }
}