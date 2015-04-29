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
    var btn = $(e.target);
    var prop = state === 'loading' ? 'disable' : 'enable';
    this[prop]();
    this.updateText(btn);
    if( btn.is('input') ){
      this.updateInput(btn, state);
    } else {
      this.updateIcon(btn, state);
    }

  },

  updateText: function(btn){
    if(btn.data('loading') === undefined){ return; }
    var val  = btn.is('input') ? 'val' : 'html';
    var text = btn[val]();
    var loadingText = btn.data('loading') || this.loadingText;
    btn.data('loading', text);
    btn[val](loadingText);
  },

  updateIcon: function(btn, state){
    if(btn.data('icon') === undefined){ return; }
    var pos = btn.data('icon') || 'prepend';
    var icon = state !== 'reset' ? '<i class="icon-' + state + '"></i>' : '';
    btn.children('i').remove();
    btn[pos](icon);
  },

  updateInput: function(btn, state){
    btn.removeClass('loading success error');
    if(state !== 'reset'){
      btn.addClass(state);
    }
  },

  updateMessage: function(){

  }

});