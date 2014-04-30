
exports.build_db_query = function(query_from_url){
    var search_term = {};

    for (var key in query_from_url) {
        if (query_from_url.hasOwnProperty(key)) {
            search_term[key] = query_from_url[key];
        }
    }

    return search_term;
};