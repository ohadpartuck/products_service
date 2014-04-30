var mongoose                = require('mongoose');

sanger_mongo_hosts          = GLOBAL.SANGER_CONFIG['mongodb']['hosts'];
GLOBAL._SANGER_MONGO_CONN   = mongoose.createConnection(sanger_mongo_hosts);