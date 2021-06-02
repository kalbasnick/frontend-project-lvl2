import _ from 'lodash';

export default (file1, file2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(file1), ...Object.keys(file2)]));

  const genStringOutput = (key, value, operator = ' ') => `\n  ${operator}  ${key}: ${value}`;

  const diff = keys.reduce((acc, key) => {
    if (!_.has(file2, key)) {
      return acc + genStringOutput(key, file1[key], '-');
    }
    if (!_.has(file1, key)) {
      return acc + genStringOutput(key, file2[key], '+');
    }
    if (file1[key] === file2[key]) {
      return acc + genStringOutput(key, file2[key]);
    }
    if (file1[key] !== file2[key]) {
      return acc + genStringOutput(key, file1[key], '-') + genStringOutput(key, file2[key], '+');
    }

    return acc;
  }, '');

  return `{${diff}\n}`;
};
