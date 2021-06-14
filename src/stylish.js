import isObject from './utils.js';

export default (tree) => {
  const iter = (node, spacesCount = 2) => {
    if (isObject(node)) {
      const keys = Object.keys(node);
      const makeIndent = (separatorCount, separator = ' ') => `\n${separator.repeat(separatorCount)}`;
      const isKeyConverted = (keyName) => [' ', '+', '-'].includes(keyName[0]);

      const result = keys.reduce((acc, key) => `${acc}${makeIndent(spacesCount)}${isKeyConverted(key) ? '' : '  '}${key}: ${iter(node[key], spacesCount + 4)}`, '{');

      return `${result}${makeIndent(spacesCount - 2)}}`;
    }

    return node;
  };

  return iter(tree);
};
