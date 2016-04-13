// load mongoose since we need it to define a model
    var mongoose = require('mongoose'),
       Schema = mongoose.Schema;

    var interactionSchema = new Schema({
          hero : String,
          notes : String
        }, {_id: false}),
        heroSchema = new Schema({
        name : {
          type : String,
          required : true
        },
        mainAttr : {
          type : String,
          enum : ['STR', 'AGI', 'INT']
        },
        goodWith : [interactionSchema],
        goodAgainst : [interactionSchema],
        badAgainst : [interactionSchema],
        imgPrefix : String
    }, {
      collection : 'heroes'
    });

    module.exports = mongoose.model('Hero', heroSchema);
