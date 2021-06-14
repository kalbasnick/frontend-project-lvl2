import { fileURLToPath } from 'url';
import path from 'path';
import { beforeAll, expect, test } from '@jest/globals';
import showDifference from '../src/showDifference.js';
import parser from '../src/parsers.js';
import stylish from '../src/stylish.js';

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
  expectedData = `{
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
});

test('compare JSON and JSON', () => {
  expect(stylish(showDifference(plainJson1, plainJson2))).toEqual(expectedData);
});

test('compare JSON and YAML', () => {
  expect(stylish(showDifference(plainJson1, plainYaml2))).toEqual(expectedData);
});

test('compare YAML and YAML', () => {
  expect(stylish(showDifference(plainYaml1, plainYaml2))).toEqual(expectedData);
});
