import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return typeof (value) === 'string' ? `'${value}'` : String(value);
};

export default (tree) => {
  const formatNode = (node, parents = []) => {
    const toPlainFormat = (data) => {
      const { type, key, value } = data;
      const propertyName = ([...parents, key]).join('.');
      switch (type) {
        case 'nested':
          return formatNode(data.children, [...parents, key]);
        case 'changed': {
          const removedValue = data.value1;
          const addedValue = data.value2;

          return `Property '${propertyName}' was updated. From ${stringify(removedValue)} to ${stringify(addedValue)}`;
        }
        case 'added':
          return `Property '${propertyName}' was added with value: ${stringify(value)}`;
        case 'removed':
          return `Property '${propertyName}' was removed`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown status: "${type}"! The status should be: "nested", "unchanged", "changed" or "added"`);
      }
    };

    return node.flatMap(toPlainFormat).join('\n');
  };

  return formatNode(tree);
};
