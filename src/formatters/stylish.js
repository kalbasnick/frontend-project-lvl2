import _ from 'lodash';

export default (tree) => {
  const buildFormattedNode = (node, depth = 1) => {
    const indentIncrement = 4;
    const indentCount = indentIncrement * depth;
    const makeIndent = (separatorCount, typeOperator = ' ', separator = ' ') => {
      const makeIndentFromOperator = typeOperator.padStart(separatorCount - typeOperator.length);

      return `\n${makeIndentFromOperator}${separator}`;
    };
    const makeFormattedLine = (data) => {
      const { type, key, value } = data;
      const typeOperators = {
        added: '+',
        removed: '-',
        unchanged: ' ',
      };

      switch (type) {
        case 'nested':
          return `${makeIndent(indentCount)}${key}: {${buildFormattedNode(value, depth + 1)}${makeIndent(indentCount)}}`;
        case 'changed': {
          const removedValue = data.value1;
          const addedValue = data.value2;

          return `${makeIndent(indentCount, typeOperators.removed)}${key}: ${buildFormattedNode(removedValue, depth + 1)}${makeIndent(indentCount, typeOperators.added)}${key}: ${buildFormattedNode(addedValue, depth + 1)}`;
        }
        case 'added':
        case 'removed':
        case 'unchanged':
          return `${makeIndent(indentCount, typeOperators[type])}${key}: ${buildFormattedNode(value, depth + 1)}`;
        default:
          throw new Error(`Unknown status: "${type}"! The status should be: "nested", "unchanged", "changed" or "added"`);
      }
    };

    if (Array.isArray(node)) {
      const result = node.map((element) => makeFormattedLine(element));

      return result.join('');
    }

    if (_.isPlainObject(node)) {
      const innerObjectKeys = Object.keys(node);
      const formattedInnerObject = innerObjectKeys.map((key) => `${makeIndent(indentCount)}${key}: ${buildFormattedNode(node[key], depth + 1)}`);

      return `{${formattedInnerObject.join('')}${makeIndent(indentCount - indentIncrement)}}`;
    }

    return node;
  };

  return `{${buildFormattedNode(tree)}\n}`;
};
