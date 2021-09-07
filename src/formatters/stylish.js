import _ from 'lodash';

const indent = (depth, indentIncrement = 4, separator = ' ') => `\n${separator.repeat(depth * indentIncrement)}`;

const operators = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
  length: 2,
};

export default (tree) => {
  const formatNode = (node, depth = 1) => {
    const stringify = (value) => {
      if (!_.isPlainObject(value)) {
        return value;
      }
      const formattedValue = Object.keys(value).map((key) => `${indent(depth + 1)}${key}: ${formatNode(value[key], depth + 1)}`);

      return `{${formattedValue.join('')}${indent(depth)}}`;
    };
    const toStylishFormat = (data) => {
      const { type, key } = data;
      switch (type) {
        case 'nested':
          return `${indent(depth)}${key}: {${formatNode(data.children, depth + 1)}${indent(depth)}}`;
        case 'changed':
          return `${indent(depth).slice(0, -operators.length)}${operators.removed}${key}: ${stringify(data.value1)}${indent(depth).slice(0, -operators.length)}${operators.added}${key}: ${stringify(data.value2)}`;
        case 'added':
        case 'removed':
        case 'unchanged':
          return `${indent(depth).slice(0, -operators.length)}${operators[type]}${key}: ${stringify(data.value)}`;
        default:
          throw new Error(`Unknown status: "${type}"! The status should be: "nested", "unchanged", "changed" or "added"`);
      }
    };

    return Array.isArray(node) ? node.map(toStylishFormat).join('') : stringify(node);
  };

  return `{${formatNode(tree)}\n}`;
};
