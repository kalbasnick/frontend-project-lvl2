import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'nested', key, children: buildTree(value1, value2) };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, value: value1 };
    }
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: value2 };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'changed',
        key,
        value1,
        value2,
      };
    }

    return { type: 'unchanged', key, value: value2 };
  });
};

export default buildTree;
