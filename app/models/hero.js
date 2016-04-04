// load mongoose since we need it to define a model
    var mongoose = require('mongoose'),
       Schema = mongoose.Schema;

    var heroSchema = new Schema({
        name : {
          type : String,
          required : true
        },
        mainAttr : {
          type : String,
          enum : ['STR', 'AGI', 'INT']
        },
        imgPrefix : String
    }, {
      collection : 'heroes'
    });

    module.exports = mongoose.model('Hero', heroSchema);
