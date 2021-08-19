export default (tree) => {
  const buildFormattedNode = (node) => node.map((element) => {
    const makeFormattedLine = (data) => {
      const { type, key, value } = data;
      const typeDesignations = {
        added: '+',
        removed: '-',
        unchanged: '',
      };

      switch (type) {
        case 'nested':
          return `${JSON.stringify(key)}:{${buildFormattedNode(value)}}`;
        case 'changed': {
          const removedValue = data.value1;
          const addedValue = data.value2;
          return `${JSON.stringify(`${typeDesignations.removed}${key}`)}:${JSON.stringify(removedValue)},${JSON.stringify(`${typeDesignations.added}${key}`)}:${JSON.stringify(addedValue)}`;
        }
        case 'added':
        case 'removed':
        case 'unchanged':
          return `${JSON.stringify(`${typeDesignations[type]}${key}`)}:${JSON.stringify(value)}`;
        default:
          throw new Error(`Unknown status: "${type}"! The status should be: "nested", "unchanged", "changed" or "added"`);
      }
    };

    return makeFormattedLine(element);
  });

  return `{${buildFormattedNode(tree)}}`;
};
