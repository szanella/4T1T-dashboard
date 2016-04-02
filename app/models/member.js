// load mongoose since we need it to define a model
    var mongoose = require('mongoose'),
       Schema = mongoose.Schema;

    var memberSchema = new Schema({
        name : {
          type : String,
          required : true
        },
        favouriteHeroes : [{
          position: String,
          name: String,
          degree: Number
        }]
    }, {
      collection : 'members'
    });

    module.exports = mongoose.model('Member', memberSchema);
