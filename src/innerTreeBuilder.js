import _ from 'lodash';

export default (parsedData1, parsedData2) => {
  const buildTree = (data1, data2) => {
    const keys = _.sortBy(_.uniq([...Object.keys(data1), ...Object.keys(data2)]));

    return keys.map((key) => {
      const value1 = data1[key];
      const value2 = data2[key];

      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return { key, value: buildTree(value1, value2), type: 'nested' };
      }
      if (!_.has(data2, key)) {
        return { key, value: value1, type: 'removed' };
      }
      if (!_.has(data1, key)) {
        return { key, value: value2, type: 'added' };
      }
      if (value1 !== value2) {
        return { key, value: [value1, value2], type: 'changed' };
      }

      return { key, value: value2, type: 'unchanged' };
    });
  };

  return buildTree(parsedData1, parsedData2);
};
