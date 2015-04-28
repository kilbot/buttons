var Mn = require('backbone.marionette');
var hbs = require('handlebars');
var tmpl = require('./buttons.hbs');
//var _ = require('lodash');
//var $ = require('jquery');
var Buttons = require('./behavior.js');

module.exports = Mn.ItemView.extend({

  viewOptions: ['buttons'],

  buttons: [{
    action: 'save',
    label: 'Save'
  }],

  template: hbs.compile(tmpl),

  initialize: function(options){
    this.mergeOptions(options, this.viewOptions);
  },

  templateHelpers: function(){
    return {
      buttons: this.buttons
    };
  },

  behaviors: {
    Buttons: {
      behaviorClass: Buttons
    }
  }

});