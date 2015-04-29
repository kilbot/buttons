/* jshint -W071 */
(function () {

  // global variables
  var $ = window.jQuery,
      //_ = window._,
      bb = window.Backbone,
      Mn = window.Marionette,
      hbs = window.Handlebars,
      Buttons = window.Buttons;

  /**
   * Behavior
   */
  var ButtonsView = Mn.ItemView.extend({
    behaviors: {
      Buttons: {
        behaviorClass: Buttons.Behavior
      }
    }
  });
  /**
   * Behavior 1
   */
  var Behavior1 = ButtonsView.extend({
    template: hbs.compile('' +
      '<button class="btn" data-action="save">Button</button> ' +
      '<a class="btn" href="#" data-action="save">Link</a>'
    )
  });

  /**
   * Behavior 2
   */
  var Behavior2 = ButtonsView.extend({
    template: hbs.compile('' +
      '<button class="btn" data-toggle="one">Toggle 1</button> ' +
      '<button class="btn" data-toggle="two" disabled>Toggle 2</button>'
    )
  });

  /**
   * Behavior 3
   */
  var Behavior3 = ButtonsView.extend({
    template: hbs.compile('' +
      '<button class="btn" data-action="save" data-loading>' +
      'Button</button> ' +
      '<a class="btn" href="#" data-action="save" data-loading="working...">' +
      'Link</a> ' +
      '<input type="button" class="btn" value="Input" data-action="save"' +
      'data-loading="waiting...">'
    )
  });

  /**
   * Behavior 4
   */
  var Behavior4 = ButtonsView.extend({
    template: hbs.compile('' +
      '<button class="btn" data-action="save" data-icon>' +
      'Button</button> ' +
      '<a class="btn" href="#" data-action="save" data-icon="append">' +
      'Link</a> ' +
      '<input type="button" class="btn" value="Input" data-action="save">'
    )
  });

  /**
   * Behavior 5
   */
  var Behavior5 = ButtonsView.extend({
    template: hbs.compile('' +
      '<button class="btn" data-action="save" data-icon>' +
      'Button</button> ' +
      '<p class="message"></p>' +
      '<a class="btn" href="#" data-action="save" data-icon="append">' +
      'Link</a> '
    )
  });

  /**
   * Service
   */
  var buttonService = new Buttons.Service();

  /**
   * Service 1
   */
  var Service1 = bb.Radio.request('buttons', 'view');

  /**
   * Service 2
   */
  var Service2 = bb.Radio.request('buttons', 'view', {
    buttons: [{
      action: 'save',
      label: 'Button'
    },{
      action: 'save',
      label: 'Link',
      type: 'link'
    }]
  });

  /**
   * Service 3
   */
  var Service3 = bb.Radio.request('buttons', 'view', {
    buttons: [{
      toggle: 'one',
      label: 'Toggle 1'
    },{
      toggle: 'two',
      label: 'Toggle 2',
      disabled: true
    }]
  });

  /**
   * Service 4
   */
  var Service4 = bb.Radio.request('buttons', 'view', {
    buttons: [{
      action: 'save',
      label: 'Button',
      loading: 'text'
    },{
      action: 'save',
      label: 'Link',
      type: 'link',
      loading: 'text',
      loadingText: 'working...'
    },{
      action: 'save',
      label: 'Input',
      type: 'input',
      loading: 'text',
      loadingText: 'waiting...'
    }]
  });

  /**
   * Service 5
   */
  var Service5 = bb.Radio.request('buttons', 'view', {
    buttons: [{
      action: 'save',
      label: 'Button',
      icon: 'prepend'
    },{
      action: 'save',
      label: 'Link',
      type: 'link',
      icon: 'append'
    },{
      action: 'save',
      label: 'Input',
      type: 'input'
    }]
  });

  /**
   * Service 6
   */
  var Service6 = bb.Radio.request('buttons', 'view', {
    buttons: [{
      action: 'save',
      label: 'Button',
      icon: 'prepend'
    },{
      type: 'message'
    },{
      action: 'save',
      label: 'Link',
      type: 'link',
      icon: 'append'
    }]
  });

  /**
   * App
   */
  function output(){
    console.log(arguments);
  }

  var LayoutView = Mn.LayoutView.extend({
    el: '#page',
    template: function(){
      return $('#page').html();
    },
    regions: {
      b1: '#b1',
      b2: '#b2',
      b3: '#b3',
      b4: '#b4',
      b5: '#b5',
      s1: '#s1',
      s2: '#s2',
      s3: '#s3',
      s4: '#s4',
      s5: '#s5',
      s6: '#s6'
    },
    onRender: function(){

      /**
       * Behavior events
       */
      var b1 = this.showChildView( 'b1', new Behavior1() );
      b1.currentView.on('action:save', output);

      var b2 = this.showChildView( 'b2', new Behavior2() );
      b2.currentView.on({
        'toggle:one': output,
        'toggle:two': output
      });

      var b3 = this.showChildView( 'b3', new Behavior3() );
      b3.currentView.on('action:save', function(btn){
        btn.trigger('state', 'loading');
        setTimeout(function(){
          btn.trigger('state', 'reset');
        }, 2000);
      });

      var b4 = this.showChildView( 'b4', new Behavior4() );
      b4.currentView.on('action:save', function(btn){
        var state = 'reset';
        if( btn.is('a') ) { state = 'success'; }
        if( btn.is('input') ) { state = 'error'; }
        btn.trigger('state', 'loading');
        setTimeout(function(){
          btn.trigger('state', state);
        }, 2000);
      });

      var b5 = this.showChildView( 'b5', new Behavior5() );
      b5.currentView.on('action:save', function(btn, view){
        var state = 'success';
        var message = 'It has been done!';
        if( btn.is('a') ) {
          state = 'error';
          message = 'There has been a problem :(';
        }
        btn.trigger('state', 'loading');
        view.triggerMethod('message', 'loading...');
        setTimeout(function(){
          btn.trigger('state', state);
          view.triggerMethod('message', message);
        }, 2000);
      });


      /**
       * Service events
       */
      var s1 = this.showChildView( 's1', Service1 );
      s1.currentView.on('action:save', output);

      var s2 = this.showChildView( 's2', Service2 );
      s2.currentView.on('action:save', output);

      var s3 = this.showChildView( 's3', Service3 );
      s3.currentView.on({
        'toggle:one': output,
        'toggle:two': output
      });

      var s4 = this.showChildView( 's4', Service4 );
      s4.currentView.on('action:save', function(btn){
        btn.trigger('state', 'loading');
        setTimeout(function(){
          btn.trigger('state', 'reset');
        }, 2000);
      });

      var s5 = this.showChildView( 's5', Service5 );
      s5.currentView.on('action:save', function(btn){
        var state = 'reset';
        if( btn.is('a') ) { state = 'success'; }
        if( btn.is('input') ) { state = 'error'; }
        btn.trigger('state', 'loading');
        setTimeout(function(){
          btn.trigger('state', state);
        }, 2000);
      });

      var s6 = this.showChildView( 's6', Service6 );
      s6.currentView.on('action:save', function(btn, view){
        var state = 'success';
        var message = 'It has been done!';
        if( btn.is('a') ) {
          state = 'error';
          message = 'There has been a problem :(';
        }
        btn.trigger('state', 'loading');
        view.triggerMethod('message', 'loading...');
        setTimeout(function(){
          btn.trigger('state', state);
          view.triggerMethod('message', message);
        }, 2000);
      });

    }
  });

  var Application = Mn.Application.extend({
    initialize: function(){
      this.layout = new LayoutView();
      this.layout.render();
      this.buttonService = buttonService;
    }
  });

  window.app = new Application();

})();
/* jshint +W071 */