import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const runFormatter = (formatterFunc, data) => formatterFunc(data);

export default (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return runFormatter(stylish, data);
    case 'plain':
      return runFormatter(plain, data);
    case '':
    case 'json':
      return runFormatter(json, data);
    default:
      throw new Error('Wrong format! Available formats: "stylish", "plain" or "json"');
  }
};
