'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eventsMixin;
var defaultEvents = {
  onChange: function onChange() {}
};

function eventsMixin() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { defaultEvents: defaultEvents };

  return Behavior({
    lifetimes: {
      created: function created() {
        this._oriTriggerEvent = this.triggerEvent;
        this.triggerEvent = this._triggerEvent;
      }
    },
    properties: {
      events: {
        type: Object,
        value: defaultEvents
      }
    },
    data: {
      inputEvents: defaultEvents
    },
    definitionFilter: function definitionFilter(defFields) {
      // set default data
      Object.assign(defFields.data = defFields.data || {}, {
        inputEvents: Object.assign({}, defaultEvents, defFields.inputEvents)
      });

      // set default methods
      Object.assign(defFields.methods = defFields.methods || {}, {
        _triggerEvent: function _triggerEvent(name, params) {
          var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
          var option = arguments[3];
          var inputEvents = this.data.inputEvents;

          var method = 'on' + name[0].toUpperCase() + name.slice(1);
          var func = inputEvents[method];

          if (runCallbacks && typeof func === 'function') {
            func.call(this, params);
          }

          this._oriTriggerEvent(name, params, option);
        }
      });

      // set default observers
      Object.assign(defFields.observers = defFields.observers || {}, {
        events: function events(newVal) {
          this.setData({
            inputEvents: Object.assign({}, defaultEvents, this.data.inputEvents, newVal)
          });
        }
      });
    }
  });
}