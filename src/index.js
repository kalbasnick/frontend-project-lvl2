import { readFile, extractFormat, buildFullPath } from './utils.js';
import parse from './parsers.js';
import buildTree from './innerTreeBuilder.js';
import format from './formatters/index.js';

export default (filePath1, filePath2, formatName = 'stylish') => {
  const fullPath1 = buildFullPath(filePath1);
  const fullPath2 = buildFullPath(filePath2);
  const data1 = parse(readFile(fullPath1), extractFormat(filePath1));
  const data2 = parse(readFile(fullPath2), extractFormat(filePath2));

  return format(buildTree(data1, data2), formatName);
};
