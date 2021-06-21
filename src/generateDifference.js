import _ from 'lodash';
import isObject from './utils.js';
import selectFormat from '../formatters/index.js';

const genDiff = (file1, file2, formatName) => {
  const iter = (data1, data2) => {
    const keys = _.sortBy(_.uniq([...Object.keys(data1), ...Object.keys(data2)]));

    return keys.map((key) => {
      if (isObject(data1[key]) && isObject(data2[key])) {
        return [key, iter(data1[key], data2[key]), { status: 'innerPropertyMatch' }];
      }
      if (!_.has(data2, key)) {
        return [key, data1[key], { status: 'removed' }];
      }
      if (!_.has(data1, key)) {
        return [key, data2[key], { status: 'added' }];
      }
      if (data1[key] === data2[key]) {
        return [key, data2[key], { status: 'unchanged' }];
      }
      if (data1[key] !== data2[key]) {
        return [key, [data1[key], data2[key]], { status: 'changed' }];
      }

      return key;
    });
  };

  return selectFormat(iter(file1, file2), formatName);
};

export default genDiff;
