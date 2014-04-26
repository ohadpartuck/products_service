var express             = require('express'),
    path                = require('path'),
    favicon             = require('static-favicon'),
    logger              = require('morgan'),
    cookieParser        = require('cookie-parser'),
    bodyParser          = require('body-parser');

module.exports = function (app) {
    // view engine setup - todo remove, this is a json api service only
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    /// catch 404 and forwarding to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function(err, req, res, next) {
        var error = (app.get('env') === 'development') ? err : {} ;
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: error
        });
    });
};