import _ from 'lodash';

export default (tree) => {
  const buildFormattedNode = (node, ancestry = []) => {
    const result = node.flatMap((element) => {
      const { key, value, type } = element;
      const makePath = (path) => path.join('.');
      const makeFormattedvalue = (valueName) => {
        if (_.isPlainObject(valueName)) {
          return '[complex value]';
        }

        return typeof valueName === 'string' ? `'${valueName}'` : valueName;
      };
      switch (type) {
        case 'nested':
          return buildFormattedNode(value, [...ancestry, key]);
        case 'changed': {
          const [removedValue, addedValue] = value;
          return `Property '${makePath([...ancestry, key])}' was updated. From ${makeFormattedvalue(removedValue)} to ${makeFormattedvalue(addedValue)}`;
        }
        case 'added':
          return `Property '${makePath([...ancestry, key])}' was added with value: ${makeFormattedvalue(value)}`;
        case 'removed':
          return `Property '${makePath([...ancestry, key])}' was removed`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown status: "${type}"! The status should be: "innerPropertyMatch", "unchanged", "changed" or "added"`);
      }
    });

    return result.join('\n');
  };

  return buildFormattedNode(tree);
};
