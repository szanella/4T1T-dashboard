// load mongoose since we need it to define a model
    var mongoose = require('mongoose'),
       Schema = mongoose.Schema;

    var memberSchema = new Schema({
        name : String,
        favouriteHeroes : [String]
    });

    module.exports = mongoose.model('Member', memberSchema);
