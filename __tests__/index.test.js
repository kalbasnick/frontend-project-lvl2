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
])('%s format', (formatName) => {
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), formatName);
  const expected = readFile(getFixturePath(`${formatName}`));

  expect(actual).toEqual(expected);
});
