import isObject from '../utils.js';

export default (tree) => {
  const iter = (node) => {
    const makeFormattedStr = (parentName, childrenName, operator = '') => `"${operator}${parentName}":${childrenName}`;
    const makeFormattedChildren = (item, callback) => (isObject(item) ? `{${callback(item)}}` : callback(item));

    if (isObject(node)) {
      return Object.keys(node).map((key) => makeFormattedStr(key, makeFormattedChildren(node[key], iter))).join(',');
    }

    if (!Array.isArray(node)) {
      return (typeof node === 'string' ? `"${node}"` : node);
    }

    const result = node.flatMap((element) => {
      const [parent, children, { status }] = element;
      switch (status) {
        case 'innerPropertyMatch':
          return makeFormattedStr(parent, `{${makeFormattedChildren(children, iter)}}`);
        case 'changed': {
          const [removedChildren, addedChildren] = children;
          return `${makeFormattedStr(parent, makeFormattedChildren(removedChildren, iter), '-')},${makeFormattedStr(parent, makeFormattedChildren(addedChildren, iter), '+')}`;
        }
        case 'added':
          return makeFormattedStr(parent, makeFormattedChildren(children, iter), '+');
        case 'removed':
          return makeFormattedStr(parent, makeFormattedChildren(children, iter), '-');
        case 'unchanged':
          return makeFormattedStr(parent, makeFormattedChildren(children, iter));
        default:
          throw new Error(`Unknown status: "${status}"! The status should be: "innerPropertyMatch", "unchanged", "changed" or "added"`);
      }
    });

    return `${result.join(',')}`;
  };

  return `{${iter(tree)}}`;
};
