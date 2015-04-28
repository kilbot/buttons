var Mn = require('backbone.marionette');
var $ = require('jquery');

module.exports = Mn.Behavior.extend({

  ui: {
    btns  : '.btn',
    action: '[data-action]',
    toggle: '[data-toggle]'
  },

  events: {
    'click @ui.action': 'action',
    'click @ui.toggle': 'toggle'
  },

  action: function(e){
    e.preventDefault();
    var action = $(e.target).data('action');
    this.view.trigger('action:' + action, action, this.view, $(e.target));
  },

  toggle: function(e){
    e.preventDefault();
    this.enable();
    this.disable($(e.target));
    var toggle = $(e.target).data('toggle');
    this.view.trigger('toggle:' + toggle, toggle, this.view, $(e.target));
  },

  enable: function(btn){
    if(btn){
      return btn.prop('disabled', false);
    }
    this.ui.btns.each(function(){
      $(this).prop('disabled', false);
    });
  },

  disable: function(btn){
    if(btn){
      return btn.prop('disabled', true);
    }
    this.ui.btns.each(function(){
      $(this).prop('disabled', true);
    });
  }


});