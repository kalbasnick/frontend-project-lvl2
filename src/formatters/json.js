import isObject from '../utils.js';

export default (tree) => {
  const iter = (node) => {
    const makeFormattedStr = (key, value, operator = '') => `"${operator}${key}":${value}`;
    const formatIfObject = (item, callback) => (isObject(item) ? `{${callback(item)}}` : callback(item));

    if (isObject(node)) {
      return Object.keys(node).map((key) => makeFormattedStr(key, formatIfObject(node[key], iter))).join(',');
    }

    if (!Array.isArray(node)) {
      return (typeof node === 'string' ? `"${node}"` : node);
    }

    const result = node.flatMap((element) => {
      const [key, value, { status }] = element;
      switch (status) {
        case 'innerPropertyMatch':
          return `${makeFormattedStr(key, `{${iter(value)}`)}}`;
        case 'changed': {
          const [oldValue, newValue] = value;
          return `${makeFormattedStr(key, formatIfObject(oldValue, iter), '-')},${makeFormattedStr(key, formatIfObject(newValue, iter), '+')}`;
        }
        case 'added':
          return makeFormattedStr(key, formatIfObject(value, iter), '+');
        case 'removed':
          return makeFormattedStr(key, formatIfObject(value, iter), '-');
        case 'unchanged':
          return makeFormattedStr(key, formatIfObject(value, iter));
        default:
          throw new Error('Wrong status! Status should be "innerPropertyMatch", "unchanged", "changed" or "added"');
      }
    });

    return `${result.join(',')}`;
  };

  return `{${iter(tree)}}`;
};
