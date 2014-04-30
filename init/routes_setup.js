module.exports = function(app){
    require('../routes/main/main_api')(app, '');
    namespace_require(app, '/sanger');
};

function namespace_require(app, namespace){
   require('../routes/' + namespace + '/' + namespace + '_api')(app, namespace);
}