import _ from 'lodash';

export default (data1, data2) => {
  const buildTree = (obj1, obj2) => {
    const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));

    return keys.map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return { type: 'nested', key, children: buildTree(value1, value2) };
      }
      if (!_.has(obj2, key)) {
        return { type: 'removed', key, value: value1 };
      }
      if (!_.has(obj1, key)) {
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

  return buildTree(data1, data2);
};
