import isObject from '../utils.js';

export default (tree) => {
  const iter = (node, depth = 1) => {
    const indentIncrement = 4;
    const indentCount = indentIncrement * depth;
    const makeIndent = (separatorCount, diffOperator = ' ', separator = ' ') => `\n${diffOperator.padStart(separatorCount - diffOperator.length)}${separator}`;
    const makeFormattedStr = (indentSettings, keyName, keyValue) => `${indentSettings}${keyName}: ${keyValue}`;

    if (isObject(node)) {
      const result = Object.keys(node).reduce((acc, key) => `${acc}${makeFormattedStr(makeIndent(indentCount), key, iter(node[key], depth + 1))}`, '{');

      return `${result}${makeIndent(indentCount - indentIncrement)}}`;
    }

    if (!Array.isArray(node)) {
      return node;
    }

    const result = node.flatMap((element) => {
      const [key, value, { status }] = element;
      switch (status) {
        case 'innerPropertyMatch':
          return makeFormattedStr(makeIndent(indentCount), key, `{${iter(value, depth + 1)}${makeIndent(indentCount)}}`);
        case 'changed': {
          const [oldValue, newValue] = value;
          return `${makeFormattedStr(makeIndent(indentCount, '-'), key, iter(oldValue, depth + 1))}${makeFormattedStr(makeIndent(indentCount, '+'), key, iter(newValue, depth + 1))}`;
        }
        case 'added':
          return makeFormattedStr(makeIndent(indentCount, '+'), key, iter(value, depth + 1));
        case 'removed':
          return makeFormattedStr(makeIndent(indentCount, '-'), key, iter(value, depth + 1));
        case 'unchanged':
          return makeFormattedStr(makeIndent(indentCount), key, iter(value, depth + 1));
        default:
          throw new Error('Wrong status! The status should be: "innerPropertyMatch", "unchanged", "changed" or "added"');
      }
    });

    return result.join('');
  };

  return `{${iter(tree)}\n}`;
};
