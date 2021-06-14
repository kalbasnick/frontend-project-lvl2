import _ from 'lodash';
import isObject from './utils.js';

const genDiff = (file1, file2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(file1), ...Object.keys(file2)]));

  const result = keys.reduce((acc, key) => {
    const genKeyStatus = (name, operator) => `${operator} ${name}`;

    if (isObject(file1[key]) && isObject(file2[key])) {
      acc[genKeyStatus(key, ' ')] = genDiff(file1[key], file2[key]);
      return acc;
    }
    if (!_.has(file2, key)) {
      acc[genKeyStatus(key, '-')] = file1[key];
      return acc;
    }
    if (!_.has(file1, key)) {
      acc[genKeyStatus(key, '+')] = file2[key];
      return acc;
    }
    if (file1[key] === file2[key]) {
      acc[genKeyStatus(key, ' ')] = file2[key];
      return acc;
    }
    if (file1[key] !== file2[key]) {
      acc[genKeyStatus(key, '-')] = file1[key];
      acc[genKeyStatus(key, '+')] = file2[key];
      return acc;
    }

    return acc;
  }, {});

  return result;
};

export default genDiff;
