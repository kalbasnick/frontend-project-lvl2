import _ from 'lodash';

const indent = (indentStep, typeOperator = ' ', indentIncrement = 4, separator = ' ') => `\n${typeOperator.padStart(indentStep * indentIncrement - typeOperator.length)}${separator}`;

const typeOperators = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

export default (tree) => {
  const formatNode = (node, depth = 1) => {
    const makeFormattedValue = (value) => {
      if (_.isPlainObject(value)) {
        const formattedInnerObject = Object.keys(value).map((key) => `${indent(depth + 1)}${key}: ${formatNode(value[key], depth + 1)}`);

        return `{${formattedInnerObject.join('')}${indent(depth)}}`;
      }

      return value;
    };
    const toStylishFormat = (data) => {
      const { type, key } = data;
      switch (type) {
        case 'nested':
          return `${indent(depth)}${key}: {${formatNode(data.children, depth + 1)}${indent(depth)}}`;
        case 'changed':
          return `${indent(depth, typeOperators.removed)}${key}: ${makeFormattedValue(data.value1)}${indent(depth, typeOperators.added)}${key}: ${makeFormattedValue(data.value2)}`;
        case 'added':
        case 'removed':
        case 'unchanged':
          return `${indent(depth, typeOperators[type])}${key}: ${makeFormattedValue(data.value)}`;
        default:
          throw new Error(`Unknown status: "${type}"! The status should be: "nested", "unchanged", "changed" or "added"`);
      }
    };

    return Array.isArray(node) ? node.map(toStylishFormat).join('') : makeFormattedValue(node);
  };

  return `{${formatNode(tree)}\n}`;
};
