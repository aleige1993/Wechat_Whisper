'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if a value is empty.
 */
function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    if (value) {
      for (var _ in value) {
        return false;
      }
    }
    return true;
  } else {
    return !value;
  }
}

exports.default = isEmpty;