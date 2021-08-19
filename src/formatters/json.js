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
          return `${JSON.stringify(element.key)}:{${buildFormattedNode(element.value)}}`;
        case 'changed': {
          const removedValue = data.value1;
          const addedValue = data.value2;
          return `${typeDesignations.removed}${JSON.stringify(key)}:${JSON.stringify(removedValue)},${typeDesignations.added}${JSON.stringify(key)}:${JSON.stringify(addedValue)}`;
        }
        case 'added':
        case 'removed':
        case 'unchanged':
          return `${typeDesignations[type]}${JSON.stringify(key)}:${JSON.stringify(value)}`;
        default:
          throw new Error(`Unknown status: "${type}"! The status should be: "nested", "unchanged", "changed" or "added"`);
      }
    };

    return makeFormattedLine(element);
  });

  return `{${buildFormattedNode(tree)}}`;
};
