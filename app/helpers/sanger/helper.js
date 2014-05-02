
exports.buildDbQuery = function(queryFromUrl){
    var searchTerm = {};

    for (var key in queryFromUrl) {
        if (queryFromUrl.hasOwnProperty(key)) {
            searchTerm[key] = queryFromUrl[key];
        }
    }

    return searchTerm;
};