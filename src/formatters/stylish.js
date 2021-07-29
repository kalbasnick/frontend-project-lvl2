import _ from 'lodash';

export default (tree) => {
  const iter = (node, depth = 1) => {
    const indentIncrement = 4;
    const indentCount = indentIncrement * depth;
    const makeIndent = (separatorCount, diffOperator = ' ', separator = ' ') => `\n${diffOperator.padStart(separatorCount - diffOperator.length)}${separator}`;
    const makeFormattedStr = (indentSettings, parentName, childrenName) => `${indentSettings}${parentName}: ${childrenName}`;
    const makeFormattedChildren = (value, callback, acc) => callback(value, acc);

    if (_.isPlainObject(node)) {
      const result = Object.keys(node).reduce((acc, parent) => `${acc}${makeFormattedStr(makeIndent(indentCount), parent, makeFormattedChildren(node[parent], iter, depth + 1))}`, '{');

      return `${result}${makeIndent(indentCount - indentIncrement)}}`;
    }

    if (!Array.isArray(node)) {
      return node;
    }

    const result = node.flatMap((element) => {
      const { parent, children, type } = element;
      switch (type) {
        case 'nested':
          return makeFormattedStr(makeIndent(indentCount), parent, `{${makeFormattedChildren(children, iter, depth + 1)}${makeIndent(indentCount)}}`);
        case 'changed': {
          const [removedChildren, addedChildren] = children;
          return `${makeFormattedStr(makeIndent(indentCount, '-'), parent, makeFormattedChildren(removedChildren, iter, depth + 1))}${makeFormattedStr(makeIndent(indentCount, '+'), parent, makeFormattedChildren(addedChildren, iter, depth + 1))}`;
        }
        case 'added':
          return makeFormattedStr(makeIndent(indentCount, '+'), parent, makeFormattedChildren(children, iter, depth + 1));
        case 'removed':
          return makeFormattedStr(makeIndent(indentCount, '-'), parent, makeFormattedChildren(children, iter, depth + 1));
        case 'unchanged':
          return makeFormattedStr(makeIndent(indentCount, ' '), parent, makeFormattedChildren(children, iter, depth + 1));
        default:
          throw new Error(`Unknown type: "${type}"! The type should be: "innerPropertyMatch", "unchanged", "changed" or "added"`);
      }
    });

    return result.join('');
  };

  return `{${iter(tree)}\n}`;
};
