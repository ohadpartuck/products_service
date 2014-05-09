var     extend                  = require('util')._extend,
        bodyParser              = require('body-parser'),
        global_constants        = require('global_constants');

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    MAIN_CONFIG             = require_settings('main');
    SANGER_CONFIG           = require_settings('sanger');


    MAIN                    = global_constants['main'];
    SANGER                  = global_constants['sanger']['sanger_constants'];
};


function require_settings(namespace){
    var defaults                = require('../configuration/' + namespace + '/defaults.json'),
        by_env                  = require('../configuration/' + namespace + '/' + ENV + '.json');
    return extend(defaults, by_env);
}
