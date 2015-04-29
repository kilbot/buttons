var Mn = require('backbone.marionette');
var $ = require('jquery');
var d = 'disabled';

module.exports = Mn.Behavior.extend({
  loadingText: 'loading...',

  ui: {
    btns  : '.btn',
    action: '[data-action]',
    toggle: '[data-toggle]'
  },

  events: {
    'click @ui.action': 'action',
    'click @ui.toggle': 'toggle',
    'state @ui.btns'  : 'setState'
  },

  action: function(e){
    e.preventDefault();
    var action = $(e.target).data('action');
    this.view.trigger('action:' + action, $(e.target), this.view, action );
  },

  toggle: function(e){
    e.preventDefault();
    this.enable().disable($(e.target));
    var toggle = $(e.target).data('toggle');
    this.view.trigger('toggle:' + toggle, $(e.target), this.view, toggle);
  },

  enable: function(btn){
    if(btn){
      btn.removeClass(d).prop(d, false);
    } else {
      this.ui.btns.each(function(){
        $(this).removeClass(d).prop(d, false);
      });
    }
    return this;
  },

  disable: function(btn){
    if(btn){
      btn.addClass(d).prop(d, true);
    } else {
      this.ui.btns.each(function(){
        $(this).addClass(d).prop(d, true);
      });
    }
    return this;
  },

  setState: function(e, state){
    state === 'loading' ? this.disable() : this.enable();
    var text = $(e.target).text();
    var loadingText = $(e.target).data('loading') || this.loadingText;
    $(e.target).data('loading', text).text(loadingText);
  }

});