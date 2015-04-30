var Mn = require('backbone.marionette');
var hbs = require('handlebars');
var tmpl = require('./buttons.hbs');
var _ = require('lodash');
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
    _.each(this.buttons, function(button){
      var type = button.type || 'button';
      button[type] = true;
    });
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