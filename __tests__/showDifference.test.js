import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import showDifference from '../src/showDifference.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const plainObj1 = JSON.parse(fs.readFileSync(getFixturePath('file1.json'), 'utf-8'));
const plainObj2 = JSON.parse(fs.readFileSync(getFixturePath('file2.json'), 'utf-8'));
const expectedData = '{\n  -  follow: false\n     host: hexlet.io\n  -  proxy: 123.234.53.22\n  -  timeout: 50\n  +  timeout: 20\n  +  verbose: true\n}';

test('compare plain objects', () => {
  expect(showDifference(plainObj1, plainObj2)).toEqual(expectedData);
});
