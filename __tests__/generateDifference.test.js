import { fileURLToPath } from 'url';
import path from 'path';
import { beforeAll, expect, test } from '@jest/globals';
import parser from '../src/parsers.js';
import genDiff from '../src/generateDifference';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let json1;
let json2;
let yaml1;
let yaml2;
let expectedDataStylish;
let expectedDataPlain;
let expectedDataJson;

beforeAll(() => {
  json1 = parser(getFixturePath('file1.json'));
  json2 = parser(getFixturePath('file2.json'));
  yaml1 = parser(getFixturePath('file1.yml'));
  yaml2 = parser(getFixturePath('file2.yaml'));
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
  expectedDataJson = '{"common":{"+follow":false,"setting1":"Value 1","-setting2":200,"-setting3":true,"+setting3":null,"+setting4":"blah blah","+setting5":{"key5":"value5"},"setting6":{"doge":{"-wow":"","+wow":"so much"},"key":"value","+ops":"vops"}},"group1":{"-baz":"bas","+baz":"bars","foo":"bar","-nest":{"key":"value"},"+nest":"str"},"-group2":{"abc":12345,"deep":{"id":45}},"+group3":{"deep":{"id":{"number":45}},"fee":100500}}';
});

test('stylish formatter JSON and JSON', () => {
  expect(genDiff(json1, json2, 'stylish')).toEqual(expectedDataStylish);
});

test('stylish formatter JSON and YAML', () => {
  expect(genDiff(json1, yaml2, 'stylish')).toEqual(expectedDataStylish);
});

test('stylish formatter YAML and YAML', () => {
  expect(genDiff(yaml1, yaml2, 'stylish')).toEqual(expectedDataStylish);
});

test('plain formatter', () => {
  expect(genDiff(json1, json2, 'plain')).toEqual(expectedDataPlain);
});

test('json formatter', () => {
  expect(genDiff(json1, json2, 'json')).toEqual(expectedDataJson);
});
