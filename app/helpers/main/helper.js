exports.generic_handler = function(error, params, onSuccess){
    if (error){
        console.log('generic_error' + error);
    }else{
        onSuccess(params);
    }

};

exports.time_now = function(){
    return new Date;
};