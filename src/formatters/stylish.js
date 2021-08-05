import _ from 'lodash';

export default (tree) => {
  const buildFormattedNode = (node, depth = 1) => {
    const indentIncrement = 4;
    const indentCount = indentIncrement * depth;
    const makeIndent = (separatorCount, diffOperator = ' ', separator = ' ') => `\n${diffOperator.padStart(separatorCount - diffOperator.length)}${separator}`;
    const makeFormattedLine = (indentSettings, keyName, valueName) => `${indentSettings}${keyName}: ${valueName}`;
    const makeFormattedvalue = (value, callback, acc) => callback(value, acc);

    if (_.isPlainObject(node)) {
      const result = Object.keys(node).reduce((acc, key) => `${acc}${makeFormattedLine(makeIndent(indentCount), key, makeFormattedvalue(node[key], buildFormattedNode, depth + 1))}`, '{');

      return `${result}${makeIndent(indentCount - indentIncrement)}}`;
    }

    if (!Array.isArray(node)) {
      return node;
    }

    const result = node.flatMap((element) => {
      const { key, value, type } = element;
      switch (type) {
        case 'nested':
          return makeFormattedLine(makeIndent(indentCount), key, `{${makeFormattedvalue(value, buildFormattedNode, depth + 1)}${makeIndent(indentCount)}}`);
        case 'changed': {
          const [removedValue, addedValue] = value;
          return `${makeFormattedLine(makeIndent(indentCount, '-'), key, makeFormattedvalue(removedValue, buildFormattedNode, depth + 1))}${makeFormattedLine(makeIndent(indentCount, '+'), key, makeFormattedvalue(addedValue, buildFormattedNode, depth + 1))}`;
        }
        case 'added':
          return makeFormattedLine(makeIndent(indentCount, '+'), key, makeFormattedvalue(value, buildFormattedNode, depth + 1));
        case 'removed':
          return makeFormattedLine(makeIndent(indentCount, '-'), key, makeFormattedvalue(value, buildFormattedNode, depth + 1));
        case 'unchanged':
          return makeFormattedLine(makeIndent(indentCount, ' '), key, makeFormattedvalue(value, buildFormattedNode, depth + 1));
        default:
          throw new Error(`Unknown type: "${type}"! The type should be: "innerPropertyMatch", "unchanged", "changed" or "added"`);
      }
    });

    return result.join('');
  };

  return `{${buildFormattedNode(tree)}\n}`;
};
