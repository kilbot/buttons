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
   * Behavior 1
   */
  var Behavior1 = Mn.ItemView.extend({
    template: hbs.compile('' +
      '<button class="btn" data-action="save">Button</button> ' +
      '<a class="btn" href="#" data-action="save">Link</a>'
    ),
    behaviors: {
      Buttons: {
        behaviorClass: Buttons.Behavior
      }
    }
  });

  /**
   * Behavior 2
   */
  var Behavior2 = Mn.ItemView.extend({
    template: hbs.compile('' +
      '<button class="btn" data-toggle="one">Toggle 1</button> ' +
      '<button class="btn" data-toggle="two" disabled>Toggle 2</button>'
    ),
    behaviors: {
      Buttons: {
        behaviorClass: Buttons.Behavior
      }
    }
  });

  /**
   * Behavior 3
   */
  var Behavior3 = Mn.ItemView.extend({
    template: hbs.compile('' +
      '<button class="btn" data-action="save">' +
      'Button</button> ' +
      '<a class="btn" href="#" data-action="save" data-loading="working...">' +
      'Link</a>'
    ),
    behaviors: {
      Buttons: {
        behaviorClass: Buttons.Behavior
      }
    }
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
      link: true
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
      link: true,
      loading: 'text',
      loadingText: 'working...'
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
      s5: '#s5'
    },
    onRender: function(){
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