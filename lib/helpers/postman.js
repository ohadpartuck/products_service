//THIS MODULE is designed to make REST calls to other services
var    extend                   = require('util')._extend;

REST_API_GET_TIMEOUT    = 200;
REST_API_PUT_TIMEOUT    = 4;
REST_API_POST_TIMEOUT   = 300;
REST_API_DELETE_TIMEOUT = 300;

var request             = require('request');

//TODO - extract to a node module for all services to use
exports.get = function(caller, path, params, onErrorBlock, onSuccessBlock){
    var url = caller_config(caller)['url'] + path;
    var options = extend({"Content-type": "text/json", timeout: REST_API_GET_TIMEOUT}, params);

    request(url, options, function (error, response, body) {
        postmanCallback(error, response, body, url, onErrorBlock, onSuccessBlock)
    });
};

exports.post = function(){

};

exports.put = function(){

};

exports.delete = function(){

};

function postmanCallback(error, response, body, url, onErrorBlock, onSuccessBlock){
    if (!error && response.statusCode == 200) {
        var response = JSON.parse(body);
        console.log(response);
        if (onSuccessBlock != undefined) {
            onSuccessBlock.json(response);
        }
    }else{
        onErrorBlock(url, params);
    }
}

function caller_config(caller){
    return MAIN_CONFIG['services'][caller];
}

