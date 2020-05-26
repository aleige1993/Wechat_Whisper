"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;
function debounce(func, wait, immediate) {
  var timeout = void 0,
      args = void 0,
      context = void 0,
      timestamp = void 0,
      result = void 0;

  function later() {
    var last = +new Date() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = undefined;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) {
          context = undefined;
          args = undefined;
        }
      }
    }
  }

  function debounced() {
    context = this;
    args = arguments;
    timestamp = +new Date();

    var callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }

    if (callNow) {
      result = func.apply(context, args);
      context = undefined;
      args = undefined;
    }

    return result;
  }

  function cancel() {
    if (timeout !== undefined) {
      clearTimeout(timeout);
      timeout = undefined;
    }

    context = undefined;
    args = undefined;
  }

  debounced.cancel = cancel;

  return debounced;
}