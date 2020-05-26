'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 获取触摸点位置信息
 */
var getTouchPoints = exports.getTouchPoints = function getTouchPoints(nativeEvent) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var touches = nativeEvent.touches;
  var changedTouches = nativeEvent.changedTouches;
  var hasTouches = touches && touches.length > 0;
  var hasChangedTouches = changedTouches && changedTouches.length > 0;
  var points = !hasTouches && hasChangedTouches ? changedTouches[index] : hasTouches ? touches[index] : nativeEvent;

  return {
    x: points.pageX,
    y: points.pageY
  };
};

/**
 * 获取触摸点个数
 */
var getPointsNumber = exports.getPointsNumber = function getPointsNumber(e) {
  return e.touches && e.touches.length || e.changedTouches && e.changedTouches.length;
};

/**
 * 判断是否为同一点
 */
var isEqualPoints = exports.isEqualPoints = function isEqualPoints(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
};

/**
 * 判断是否为相近的两点
 */
var isNearbyPoints = exports.isNearbyPoints = function isNearbyPoints(p1, p2) {
  var DOUBLE_TAP_RADIUS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 25;

  var xMove = Math.abs(p1.x - p2.x);
  var yMove = Math.abs(p1.y - p2.y);
  return xMove < DOUBLE_TAP_RADIUS & yMove < DOUBLE_TAP_RADIUS;
};

/**
 * 获取两点之间的距离
 */
var getPointsDistance = exports.getPointsDistance = function getPointsDistance(p1, p2) {
  var xMove = Math.abs(p1.x - p2.x);
  var yMove = Math.abs(p1.y - p2.y);
  return Math.sqrt(xMove * xMove + yMove * yMove);
};

/**
 * 获取触摸移动方向
 */
var getSwipeDirection = exports.getSwipeDirection = function getSwipeDirection(x1, x2, y1, y2) {
  return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
};