import _ from 'lodash';
import isObject from './utils.js';
import selectFormat from '../formatters/index.js';

const genDiff = (file1, file2, formatName) => {
  const iter = (data1, data2) => {
    const keys = _.sortBy(_.uniq([...Object.keys(data1), ...Object.keys(data2)]));

    return keys.reduce((acc, key) => {
      if (isObject(data1[key]) && isObject(data2[key])) {
        acc.push([key, iter(data1[key], data2[key]), { status: 'innerPropertyMatch' }]);
        return acc;
      }
      if (!_.has(data2, key)) {
        acc.push([key, data1[key], { status: 'removed' }]);
        return acc;
      }
      if (!_.has(data1, key)) {
        acc.push([key, data2[key], { status: 'added' }]);
        return acc;
      }
      if (data1[key] === data2[key]) {
        acc.push([key, data2[key], { status: 'unchanged' }]);
        return acc;
      }
      if (data1[key] !== data2[key]) {
        acc.push([key, [data1[key], data2[key]], { status: 'changed' }]);
        return acc;
      }

      return acc;
    }, []);
  };

  return selectFormat(iter(file1, file2), formatName);
};

export default genDiff;
