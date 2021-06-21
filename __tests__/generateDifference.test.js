import { fileURLToPath } from 'url';
import path from 'path';
import { beforeAll, expect, test } from '@jest/globals';
import parser from '../src/parsers.js';
import genDiff from '../src/generateDifference';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let plainJson1;
let plainJson2;
let plainYaml1;
let plainYaml2;
let expectedDataStylish;
let expectedDataPlain;

beforeAll(() => {
  plainJson1 = parser(getFixturePath('file1.json'));
  plainJson2 = parser(getFixturePath('file2.json'));
  plainYaml1 = parser(getFixturePath('file1.yml'));
  plainYaml2 = parser(getFixturePath('file2.yaml'));
  expectedDataStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  expectedDataPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
});

test('stylish format compare JSON and JSON', () => {
  expect(genDiff(plainJson1, plainJson2, 'stylish')).toEqual(expectedDataStylish);
});

test('stylish format compare JSON and YAML', () => {
  expect(genDiff(plainJson1, plainYaml2, 'stylish')).toEqual(expectedDataStylish);
});

test('stylish format compare YAML and YAML', () => {
  expect(genDiff(plainYaml1, plainYaml2, 'stylish')).toEqual(expectedDataStylish);
});

test('plain format compare JSON and JSON', () => {
  expect(genDiff(plainJson1, plainJson2, 'plain')).toEqual(expectedDataPlain);
});

test('plain format compare JSON and YAML', () => {
  expect(genDiff(plainJson1, plainYaml2, 'plain')).toEqual(expectedDataPlain);
});

test('plain format compare YAML and YAML', () => {
  expect(genDiff(plainYaml1, plainYaml2, 'plain')).toEqual(expectedDataPlain);
});
