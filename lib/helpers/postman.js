//THIS MODULE is designed to make REST calls to other services
var    extend                   = require('util')._extend;


//TODO - benchmark these
REST_API_GET_TIMEOUT    = 200;
REST_API_PUT_TIMEOUT    = 200;
REST_API_POST_TIMEOUT   = 300;
REST_API_DELETE_TIMEOUT = 300;

var request             = require('request');

//TODO - extract to a node module for all services to use
exports.get = function(caller, path, params, onErrorBlock, onSuccessBlock){
    var url     = caller_config(caller)['url'] + path,
        options = extend({'Content-type': 'text/json', timeout: REST_API_GET_TIMEOUT}, params);

    request(url, options, function (error, response, body) {
        postmanCallback('GET', error, response, body, url, params, onErrorBlock, onSuccessBlock)
    });
};

exports.post = function(caller, path, params, onErrorBlock, onSuccessBlock){
    var url     = caller_config(caller)['url'] + path,
        options = {form: JSON.stringify(params)};

    request.post(url, options, function (error, response, body) {
        postmanCallback('POST', error, response, body, url, params, onErrorBlock, onSuccessBlock)
    });
};

exports.put = function(caller, path, params, onErrorBlock, onSuccessBlock){
    var url     = caller_config(caller)['url'] + path;
    var options = {'content-type': 'application/json',  form: params};

    request.put(url, options, function (error, response, body) {
        postmanCallback('PUT', error, response, body, url, params, onErrorBlock, onSuccessBlock)
    });
};

exports.delete = function(){
    var url     = caller_config(caller)['url'] + path,
        options = {form: JSON.stringify(params)};

    request.delete(url, options, function (error, response, body) {
        postmanCallback('DELETE', error, response, body, url, params, onErrorBlock, onSuccessBlock)
    });
};

function caller_config(caller){
    return MAIN_CONFIG['services'][caller];
}

function postmanCallback(type, error, response, body, url, params, onErrorBlock, onSuccessBlock){
    if (!error && response.statusCode == 200) {
        handleSuccessResponse(body, onSuccessBlock, type)
    }else{
        handleErrorResponse(params, error, onSuccessBlock, onErrorBlock, url, type)
    }
}

function handleSuccessResponse(body, onSuccessBlock, type){
    var response = JSON.parse(body);
    console.log(response);
    if (type == 'GET') {
        onSuccessBlock.json(response);
    }else{
        onSuccessBlock(response);
    }
}

function handleErrorResponse(params, error, onSuccessBlock, onErrorBlock, url, type){
    var errorObj = {url:url, params: params, error: error};
    onErrorBlock(errorObj);
    if (type == 'GET') {
        //TODO - not sure that errorObj is the correct thing to send in general
        onSuccessBlock.json(errorObj);
    }
}
