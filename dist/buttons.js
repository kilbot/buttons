/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {global['Buttons'] = {
	  Behavior: __webpack_require__(1),
	  Service: __webpack_require__(2)
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Mn = __webpack_require__(3);
	var $ = __webpack_require__(4);
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Mn = __webpack_require__(3);
	var Radio = __webpack_require__(5);
	var View = __webpack_require__(6);

	module.exports = Mn.Object.extend({

	  initialize: function(){

	    this.channel = Radio.channel('buttons');

	    this.channel.reply({
	      'view' : this.view
	    }, this);

	  },

	  view: function(options){
	    var view = new View(options);
	    return view;
	  }

	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Marionette;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = jQuery;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Backbone.Radio;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Mn = __webpack_require__(3);
	var hbs = __webpack_require__(7);
	var tmpl = __webpack_require__(8);
	//var _ = require('lodash');
	//var $ = require('jquery');
	var Buttons = __webpack_require__(1);

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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Handlebars;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "{{#each buttons}}\n  {{#if this.link}}\n  <a href=\"#\" class=\"btn {{this.className}}\"\n   {{#if this.action}}data-action=\"{{this.action}}\"{{/if}}\n   {{#if this.toggle}}data-toggle=\"{{this.toggle}}\"{{/if}}\n   {{#if this.loading}}data-loading=\"{{this.loadingText}}\"{{/if}}\n  >\n    {{this.label}}\n  </a>\n  {{else}}\n  <button class=\"btn {{this.className}}\"\n    {{#if this.action}}data-action=\"{{this.action}}\"{{/if}}\n    {{#if this.toggle}}data-toggle=\"{{this.toggle}}\"{{/if}}\n    {{#if this.loading}}data-loading=\"{{this.loadingText}}\"{{/if}}\n    {{#if this.disabled}}disabled{{/if}}\n  >\n    {{this.label}}\n  </button>\n  {{/if}}\n{{/each}}"

/***/ }
/******/ ]);