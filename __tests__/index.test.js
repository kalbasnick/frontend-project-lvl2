import { fileURLToPath } from 'url';
import path from 'path';
import { expect, test } from '@jest/globals';
import readFile from '../src/utils.js';
import genDiff from '../src/index';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pathToFixtures = path.join(__dirname, '..', '__fixtures__');

test.each([
  ['stylish'],
  ['plain'],
  ['json'],
])('%s format', (formatName) => {
  const actualValue = (filename1, filename2) => genDiff(`${pathToFixtures}/${filename1}`, `${pathToFixtures}/${filename2}`, formatName);
  const expectedValue = (format) => readFile(`${pathToFixtures}/${format}Expected.txt`);

  expect(actualValue('file1.json', 'file2.json')).toEqual(expectedValue(formatName));
  expect(actualValue('file1.yml', 'file2.json')).toEqual(expectedValue(formatName));
  expect(actualValue('file1.yml', 'file2.yaml')).toEqual(expectedValue(formatName));
});
