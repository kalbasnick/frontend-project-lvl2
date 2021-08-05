import { fileURLToPath } from 'url';
import path from 'path';
import { expect, test } from '@jest/globals';
import readFile from '../src/utils.js';
import genDiff from '../src/index';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test.each([
  ['stylish'],
  ['plain'],
  ['json'],
])('%s format', (format) => {
  const actual = (file1, file2) => genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expected = readFile(getFixturePath(`${format}Expected.txt`));

  expect(actual('file1.json', 'file2.json')).toEqual(expected);
  expect(actual('file1.yml', 'file2.json')).toEqual(expected);
  expect(actual('file1.yml', 'file2.yaml')).toEqual(expected);
});
