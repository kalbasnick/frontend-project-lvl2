import _ from 'lodash';

export default (tree) => {
  const buildFormattedNode = (node, parents = []) => {
    const makeFormattedLine = (data) => {
      const { type, key, value } = data;
      const getPropertyName = (path) => path.join('.');
      const makeFormattedValue = (valueName) => {
        const formattedValue = _.isPlainObject(valueName) ? '[complex value]' : JSON.stringify(valueName);
        const replaceDoubleQuotesWithSingleQuotes = (str) => str.replace(/"/g, "'");

        return replaceDoubleQuotesWithSingleQuotes(formattedValue);
      };
      const propertyName = getPropertyName([...parents, key]);

      switch (type) {
        case 'nested':
          return buildFormattedNode(value, [...parents, key]);
        case 'changed': {
          const removedValue = data.value1;
          const addedValue = data.value2;

          return `Property '${propertyName}' was updated. From ${makeFormattedValue(removedValue)} to ${makeFormattedValue(addedValue)}`;
        }
        case 'added':
          return `Property '${propertyName}' was added with value: ${makeFormattedValue(value)}`;
        case 'removed':
          return `Property '${propertyName}' was removed`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown status: "${type}"! The status should be: "nested", "unchanged", "changed" or "added"`);
      }
    };
    const result = node.flatMap((element) => makeFormattedLine(element));

    return result.join('\n');
  };

  return buildFormattedNode(tree);
};
