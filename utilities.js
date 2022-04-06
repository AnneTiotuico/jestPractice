var _ = function(element) {
  return {
    first: () => first.call(this, element),
    last: () => last.call(this, element),
    without: (...values) => without.call(this, element, values),
    lastIndexOf: (val) => lastIndexOf.call(this, element, val),
    sample: (qty) => sample.call(this, element, qty),
    findWhere: (obj) => where.call(this, element, obj)[0],
    where: (obj) => where.call(this, element, obj),
    pluck: (key) => pluck.call(this, element, key),
    keys: () => Object.keys.call(this, element),
    values: () => Object.values.call(this, element),
    pick: (...keys) => pick.call(this, element, keys),
    omit: (...keys) => omit.call(this, element, keys),
    has: (ownProp) => Object.prototype.hasOwnProperty.call(this, ownProp),
  };
};

function first(element) {
  return element[0];
}

function last(element) {
  return element[element.length - 1];
}

function without(element, values) {
  return element.filter(el => !values.includes(el));
}

function lastIndexOf(element, val) {
  return element.lastIndexOf(val);
}

function sample(element, qty) {
  return qty ? element.slice(0, qty) : element[0];
}

function where(element, obj) {
  return element.filter(ob => {
    return Object.values(obj).every(val => {
      return Object.values(ob).includes(val);
    });
  });
}

function pluck(element, key) {
  return element.filter(ob => ob[key]).map(ob => ob[key]);
}

function pick(element, keys) {
  let newObj = [];
  let oldProps = Object.entries(element);
  oldProps.forEach(([key, value]) => {
    if (keys.includes(key)) {
      newObj.push([key, value]);
    }
  });

  return Object.fromEntries(newObj);
}

function omit(element, keys) {
  let newObj = [];
  let oldProps = Object.entries(element);
  oldProps.forEach(([key, value]) => {
    if (!keys.includes(key)) {
      newObj.push([key, value]);
    }
  });
  return Object.fromEntries(newObj);
}

(function(methods) {
  methods.forEach(method => {
    _()[method] = _[method];
  });
}(['isElement', 'isArray', 'isObject', 'isFunction', 'isBoolean', 'isString', 'isNumber']));

_.range = function(...values) {
  if (values.length === 1) {
    return [...Array(values[0]).keys()];
  }
  let start = values[0];
  let end = values[1];
  let result = [];
  while (start < end) {
    result.push(start);
    start++;
  }
  return result;
};

_.extend = function(...objs) {
  return Object.assign(objs[0], ...objs);
};

_.isElement = function(value) {
  return value instanceof HTMLElement;
};

_.isArray = function(value) {
  return Array.isArray(value);
};

_.isObject = function(value) {
  return (typeof value === 'object' || typeof value === 'function');
};

_.isFunction = function(value) {
  return typeof value === 'function';
};

_.isString = function(value) {
  return  value.constructor.name === 'String';
};

_.isNumber = function(value) {
  return value.constructor.name === 'Number';
};

_.isBoolean = function(value) {
  return value.constructor.name === 'Boolean';
};

module.exports = {
  _: _,
  range: _.range,
  extend: _.extend,
  isElement: _.isElement,
  isArray: _.isArray,
  isObject: _.isObject,
  isFunction: _.isFunction,
  isString: _.isString,
  isNumber: _.isNumber,
  isBoolean: _.isBoolean
};