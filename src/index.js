import path from 'path';
import fs from 'fs';
import parseFileByExtension from './parsers.js';
import makeInnerTree from './innerTreeMaker.js';
import format from './formatters/index.js';

export default (filePath1, filePath2, formatName = 'stylish') => {
  const readFile = (pathToFile) => fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf-8');
  const parseFile = (file) => parseFileByExtension(readFile(file), path.extname(file));

  return format(makeInnerTree(parseFile(filePath1), parseFile(filePath2)), formatName);
};
