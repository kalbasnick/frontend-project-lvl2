import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test.each([
  ['file1.json', 'file2.json', 'stylish'],
  ['file1.json', 'file2.yaml', 'stylish'],
  ['file1.yml', 'file2.yaml', 'stylish'],
  ['file1.json', 'file2.json', 'plain', fs.readFileSync(getFixturePath('expectedPlainFormat.txt'), 'utf-8')],
  ['file1.json', 'file2.json', 'json', fs.readFileSync(getFixturePath('expectedJsonFormat.txt'), 'utf-8')],
])('compare "%s" and "%s" using "%s" format', (file1, file2, formatName, expected = fs.readFileSync(getFixturePath('expectedStylishFormat.txt'), 'utf-8')) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), formatName)).toEqual(expected);
});
