var express     = require('express');
var router      = express.Router();


module.exports = function (app, namespace) {
    router.get('/', function(req, res) {
        res.json({'body': 123});
    });

    app.use(namespace + '/v1', router);
};