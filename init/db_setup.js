var mongoose                = require('mongoose');

sanger_mongo_hosts          = SANGER_CONFIG['mongodb']['hosts'];
_SANGER_MONGO_CONN   = mongoose.createConnection(sanger_mongo_hosts);