var sanger_mongoose     = require('mongoose'),
    Schema              = sanger_mongoose.Schema;


var productSchema = new Schema({
    name                    : { type: String, required: true, unique: true, index: true },  // indexing because we want the validate unique won't take long.
    stores_available_in     : Array,
    tags                    : Array,
    locale                  : String
});


module.exports = SANGER_MONGO_CONN.model('Product', productSchema);

