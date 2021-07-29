import _ from 'lodash';

export default (tree) => {
  const iter = (node, ancestry = []) => {
    const result = node.flatMap((element) => {
      const { parent, children, type } = element;
      const makePath = (path) => path.join('.');
      const makeFormattedChildren = (childrenName) => {
        if (_.isPlainObject(childrenName)) {
          return '[complex value]';
        }

        return typeof childrenName === 'string' ? `'${childrenName}'` : childrenName;
      };
      switch (type) {
        case 'nested':
          return iter(children, [...ancestry, parent]);
        case 'changed': {
          const [removedChildren, addedChildren] = children;
          return `Property '${makePath([...ancestry, parent])}' was updated. From ${makeFormattedChildren(removedChildren)} to ${makeFormattedChildren(addedChildren)}`;
        }
        case 'added':
          return `Property '${makePath([...ancestry, parent])}' was added with value: ${makeFormattedChildren(children)}`;
        case 'removed':
          return `Property '${makePath([...ancestry, parent])}' was removed`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown status: "${type}"! The status should be: "innerPropertyMatch", "unchanged", "changed" or "added"`);
      }
    });

    return result.join('\n');
  };

  return iter(tree);
};
