var _ = function(element) {
  var u = {
    first: function() {
      return element[0];
    },
    last: function() {
      return element[element.length - 1];
    },
    without: function(...values) {
      let newArr = element.slice(0);

      values.forEach(value => {
        let idx = newArr.indexOf(value);
        newArr.splice(idx, 1);
      });
      return newArr;
    },
    lastIndexOf(value) {
      return element.lastIndexOf(value);
    },
    sample(qty) {
      if (qty === undefined) {
        return element[0];
      } else {
        return element.slice(0, 4);
      }
    },
    findWhere(obj) {
      return element.filter(ob => {
        let objValues = Object.values(obj);
        let obValues = Object.values(ob);
        return objValues.every(val => obValues.includes(val));
      })[0];
    },
    where(obj) {
      return element.filter(ob => {
        let objValues = Object.values(obj);
        let obValues = Object.values(ob);
        return objValues.every(val => obValues.includes(val));
      });
    },
    pluck(key) {
      return element.filter(ob => {
        let obValues = Object.keys(ob);
        return obValues.includes(key);
      }).map(ob => ob[key]);
    },
    keys() {
      return Object.keys(element);
    },
    values() {
      return Object.values(element);
    },

    pick(...keys) {
      let newObj = [];
      let oldProps = Object.entries(element);
      oldProps.forEach(([key, value]) => {
        if (keys.includes(key)) {
          newObj.push([key, value]);
        }
      });

      return Object.fromEntries(newObj);
    },

    omit(...keys) {
      let newObj = [];
      let oldProps = Object.entries(element);
      oldProps.forEach(([key, value]) => {
        if (!keys.includes(key)) {
          newObj.push([key, value]);
        }
      });
      return Object.fromEntries(newObj);
    },

    has(ownProp) {
      element.hasOwnProperty = Object.prototype.hasOwnProperty.bind(element);
      return element.hasOwnProperty(ownProp);
    },
  };

  (function(methods) {
    methods.forEach(method => {
      u[method] = _[method];
    });
  }(['isElement', 'isArray', 'isObject', 'isFunction', 'isBoolean', 'isString', 'isNumber']));

  return u;
};

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