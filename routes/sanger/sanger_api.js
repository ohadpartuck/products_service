var    sanger              = require('../../lib/sanger/sanger');

module.exports = function (app, namespace) {
    var router = setupDefaultsRoutes(sanger);

    app.use(namespace + '/v1', router);
};
