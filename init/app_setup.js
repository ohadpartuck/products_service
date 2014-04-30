var    extend              = require('util')._extend,
       bodyParser          = require('body-parser');

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    GLOBAL.MAIN_CONFIG      = require_settings('main');
    GLOBAL.SANGER_CONFIG    = require_settings('sanger');
};


function require_settings(namespace){
    var defaults            = require('../configuration/' + namespace + '/defaults.json'),
        by_env              = require('../configuration/' + namespace + '/' + GLOBAL.ENV + '.json');
    return extend(defaults, by_env);
}