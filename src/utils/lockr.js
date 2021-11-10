let Lockr = {};
Lockr.prefix = "";
Lockr._getPrefixedKey = function (key, options) {
  options = options || {};
  if (options.noPrefix) {
    return key;
  } else {
    return this.prefix + key;
  }
};

Lockr.set = function (key, value, options) {
  var query_key = this._getPrefixedKey(key, options);
  try {
    localStorage.setItem(query_key, JSON.stringify({ data: value }));
  } catch (e) {
    if (console)
      console.warn(
        "Lockr didn't successfully save the '{" +
        key +
        ": " +
        value +
        "}' pair, because the localStorage is full."
      );
  }
};

Lockr.get = function (key, missing, options) {
  var query_key = this._getPrefixedKey(key, options),
    value;
  try {
    // console.log('localStorage',localStorage)
    value = JSON.parse(localStorage.getItem(query_key));
  } catch (e) {
    try {
      if (localStorage[query_key]) {
        value = { data: localStorage.getItem(query_key) };
      } else {
        value = null;
      }
    } catch (error) {
      console.log(error)
    }
  }
  if (!value) {
    return missing;
  } else if (typeof value === "object" && typeof value.data !== "undefined") {
    return value.data;
  }
};

Lockr.sadd = function (key, value, options) {
  var query_key = this._getPrefixedKey(key, options),
    json;

  var values = Lockr.smembers(key);

  if (values.indexOf(value) > -1) {
    return null;
  }

  try {
    values.push(value);
    json = JSON.stringify({ data: values });
    localStorage.setItem(query_key, json);
  } catch (e) {
    console.log(e);
    if (console)
      console.warn(
        "Lockr didn't successfully add the " +
        value +
        " to " +
        key +
        " set, because the localStorage is full."
      );
  }
};

Lockr.smembers = function (key, options) {
  var query_key = this._getPrefixedKey(key, options),
    value;

  try {
    value = JSON.parse(localStorage.getItem(query_key));
  } catch (e) {
    value = null;
  }

  return value && value.data ? value.data : [];
};

Lockr.sismember = function (key, value, options) {
  return Lockr.smembers(key).indexOf(value) > -1;
};

Lockr.keys = function () {
  var keys = [];
  var allKeys = Object.keys(localStorage);

  if (Lockr.prefix.length === 0) {
    return allKeys;
  }

  allKeys.forEach(function (key) {
    if (key.indexOf(Lockr.prefix) !== -1) {
      keys.push(key.replace(Lockr.prefix, ""));
    }
  });

  return keys;
};

Lockr.getAll = function (includeKeys) {
  var keys = Lockr.keys();

  if (includeKeys) {
    return keys.reduce(function (accum, key) {
      var tempObj = {};
      tempObj[key] = Lockr.get(key);
      accum.push(tempObj);
      return accum;
    }, []);
  }

  return keys.map(function (key) {
    return Lockr.get(key);
  });
};

Lockr.srem = function (key, value, options) {
  var query_key = this._getPrefixedKey(key, options),
    json,
    index;

  var values = Lockr.smembers(key, value);

  index = values.indexOf(value);

  if (index > -1) values.splice(index, 1);

  json = JSON.stringify({ data: values });

  try {
    localStorage.setItem(query_key, json);
  } catch (e) {
    if (console)
      console.warn(
        "Lockr couldn't remove the " + value + " from the set " + key
      );
  }
};

Lockr.rm = function (key) {
  var queryKey = this._getPrefixedKey(key);

  localStorage.removeItem(queryKey);
};

Lockr.flush = function () {
  if (Lockr.prefix.length) {
    Lockr.keys().forEach(function (key) {
      localStorage.removeItem(Lockr._getPrefixedKey(key));
    });
  } else {
    localStorage.clear();
  }
};

export default Lockr;
// module.exports = Lockr;
