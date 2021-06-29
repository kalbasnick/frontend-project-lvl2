import isObject from '../utils.js';

export default (tree) => {
  const iter = (node, ancestry = []) => {
    const result = node.flatMap((element) => {
      const [key, value, { status }] = element;
      const makePath = (path) => path.join('.');
      const formatValueOutput = (givenValue) => {
        if (isObject(givenValue)) {
          return '[complex value]';
        }

        return typeof givenValue === 'string' ? `'${givenValue}'` : givenValue;
      };
      switch (status) {
        case 'innerPropertyMatch':
          return iter(value, [...ancestry, key]);
        case 'changed': {
          const [oldValue, newValue] = value;
          return `Property '${makePath([...ancestry, key])}' was updated. From ${formatValueOutput(oldValue)} to ${formatValueOutput(newValue)}`;
        }
        case 'added':
          return `Property '${makePath([...ancestry, key])}' was added with value: ${formatValueOutput(value)}`;
        case 'removed':
          return `Property '${makePath([...ancestry, key])}' was removed`;
        case 'unchanged':
          return [];
        default:
          throw new Error('Wrong status! The status should be: "innerPropertyMatch", "unchanged", "changed" or "added"');
      }
    });

    return result.join('\n');
  };

  return iter(tree);
};
