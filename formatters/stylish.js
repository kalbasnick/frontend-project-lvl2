import isObject from '../src/utils.js';

const makeIndent = (separatorCount, separator = ' ') => `\n${separator.repeat(separatorCount)}`;

export default (tree) => {
  const iter = (node, spacesCount = 2) => {
    const formatResultOutput = (key, value, indent, operator = ' ') => `${indent}${operator} ${key}: ${value}`;
    const formatInnerValue = (innerValue, indentStart) => {
      const innerValueIter = (data, indentCount) => {
        if (isObject(data)) {
          const result = Object.keys(data).reduce((acc, key) => `${acc}${makeIndent(indentCount)}${key}: ${innerValueIter(data[key], indentCount + 4)}`, '{');

          return `${result}${makeIndent(indentCount - 4)}}`;
        }

        return data;
      };

      return innerValueIter(innerValue, indentStart);
    };

    const result = node.flatMap((element) => {
      const [key, value, { status }] = element;
      switch (status) {
        case 'innerPropertyMatch':
          return `${formatResultOutput(key, `{${iter(value, spacesCount + 4)}`, makeIndent(spacesCount))}${makeIndent(spacesCount + 2)}}`;
        case 'changed': {
          const [oldValue, newValue] = value;
          return `${formatResultOutput(key, `${formatInnerValue(oldValue, spacesCount + 6)}`, makeIndent(spacesCount), '-')}${formatResultOutput(key, `${formatInnerValue(newValue, spacesCount + 6)}`, makeIndent(spacesCount), '+')}`;
        }
        case 'added':
          return formatResultOutput(key, `${formatInnerValue(value, spacesCount + 6)}`, makeIndent(spacesCount), '+');
        case 'removed':
          return formatResultOutput(key, `${formatInnerValue(value, spacesCount + 6)}`, makeIndent(spacesCount), '-');
        case 'unchanged':
          return formatResultOutput(key, `${formatInnerValue(value, spacesCount + 6)}`, makeIndent(spacesCount));
        default:
          throw new Error('Wrong status! The status should be: "innerPropertyMatch", "unchanged", "changed" or "added"');
      }
    });

    return result.join('');
  };

  return `{${iter(tree)}\n}`;
};
