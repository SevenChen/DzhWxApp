export function serialize(params, obj, traditional, scope) {
  const array = (obj instanceof Array);
  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    // eslint-disable-next-line no-param-reassign
    if (scope) key = traditional ? scope : `scope[${(array ? '' : key)}]`; // scope + '[' + (array ? '' : key) + ']'
    // handle data in serializeArray() format
    if (!scope && array) params.add(value.name, value.value);
    // recurse into nested objects
    else if (traditional ? (value instanceof Array) : (typeof value === 'object')) serialize(params, value, traditional, key);
    else params.add(key, value);
  });
}

export function param(obj, traditional) {
  const params = [];
  params.add = function add(k, v) { this.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`); };
  serialize(params, obj, traditional);
  return params.join('&').replace('%20', '+');
}
