import _ from 'lodash';

export default (tree) => {
  const buildFormattedNode = (node) => {
    const makeFormattedLine = (keyName, valueName, operator = '') => `"${operator}${keyName}":${valueName}`;
    const makeFormattedvalue = (item, callback) => (_.isPlainObject(item) ? `{${callback(item)}}` : callback(item));

    if (_.isPlainObject(node)) {
      return Object.keys(node).map((key) => makeFormattedLine(key, makeFormattedvalue(node[key], buildFormattedNode))).join(',');
    }

    if (!Array.isArray(node)) {
      return (typeof node === 'string' ? `"${node}"` : node);
    }

    const result = node.flatMap((element) => {
      const { key, value, type } = element;
      switch (type) {
        case 'nested':
          return makeFormattedLine(key, `{${makeFormattedvalue(value, buildFormattedNode)}}`);
        case 'changed': {
          const [removedValue, addedValue] = value;
          return `${makeFormattedLine(key, makeFormattedvalue(removedValue, buildFormattedNode), '-')},${makeFormattedLine(key, makeFormattedvalue(addedValue, buildFormattedNode), '+')}`;
        }
        case 'added':
          return makeFormattedLine(key, makeFormattedvalue(value, buildFormattedNode), '+');
        case 'removed':
          return makeFormattedLine(key, makeFormattedvalue(value, buildFormattedNode), '-');
        case 'unchanged':
          return makeFormattedLine(key, makeFormattedvalue(value, buildFormattedNode));
        default:
          throw new Error(`Unknown type: "${type}"! The type should be: "innerPropertyMatch", "unchanged", "changed" or "added"`);
      }
    });

    return `${result.join(',')}`;
  };

  return `{${buildFormattedNode(tree)}}`;
};
