import path from 'path';
import readFile from './utils.js';
import parseData from './parsers.js';
import makeInnerTree from './innerTreeMaker.js';
import format from './formatters/index.js';

export default (filePath1, filePath2, formatName = 'stylish') => {
  const parsedData1 = parseData(readFile(filePath1), path.extname(filePath1));
  const parsedData2 = parseData(readFile(filePath2), path.extname(filePath2));

  return format(makeInnerTree(parsedData1, parsedData2), formatName);
};
