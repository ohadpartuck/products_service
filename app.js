ROOT = __dirname;
ENV  = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();

var express         = require('express'),
    app             = express(),
    server          = require('http').createServer(app);

server.listen(9002, function(){
    console.log('Express 4 ready to rock and roll on  port 9002');
});

require('./init/app_setup')(app);
require('./init/global_methods/global_methods');
require('./init/db_setup');
require('./init/routes_setup')(app);

module.exports = app;