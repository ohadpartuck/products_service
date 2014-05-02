var    extend                   = require('util')._extend,
       bodyParser               = require('body-parser'),
       global_constants         = require('global_constants');

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    GLOBAL.MAIN_CONFIG          = require_settings('main');
    GLOBAL.SANGER_CONFIG        = require_settings('sanger');


    GLOBAL.SANGER_CONSTATNTS    = global_constants['sanger']['sanger_constants'];
};


function require_settings(namespace){
    var defaults                = require('../configuration/' + namespace + '/defaults.json'),
        by_env                  = require('../configuration/' + namespace + '/' + GLOBAL.ENV + '.json');
    return extend(defaults, by_env);
}