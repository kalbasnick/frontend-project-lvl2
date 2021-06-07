import { fileURLToPath } from 'url';
import path from 'path';
import { beforeAll, expect, test } from '@jest/globals';
import showDifference from '../src/showDifference.js';
import parser from '../src/parsers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let plainJson1;
let plainJson2;
let plainYaml1;
let plainYaml2;
let expectedData;

beforeAll(() => {
  plainJson1 = parser(getFixturePath('file1.json'));
  plainJson2 = parser(getFixturePath('file2.json'));
  plainYaml1 = parser(getFixturePath('file1.yml'));
  plainYaml2 = parser(getFixturePath('file2.yaml'));
  expectedData = '{\n  -  follow: false\n     host: hexlet.io\n  -  proxy: 123.234.53.22\n  -  timeout: 50\n  +  timeout: 20\n  +  verbose: true\n}';
});

test('compare plain JSON and JSON', () => {
  expect(showDifference(plainJson1, plainJson2)).toEqual(expectedData);
});

test('compare plain JSON and YAML', () => {
  expect(showDifference(plainJson1, plainYaml2)).toEqual(expectedData);
});

test('compare plain YAML and YAML', () => {
  expect(showDifference(plainYaml1, plainYaml2)).toEqual(expectedData);
});
