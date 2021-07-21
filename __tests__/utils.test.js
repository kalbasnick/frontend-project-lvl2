import { expect, test } from '@jest/globals';
import isObject from '../src/utils.js';

test('isObject', () => {
  expect(isObject({})).toBeTruthy();
  expect(isObject([])).toBeFalsy();
  expect(isObject(null)).toBeFalsy();
  expect(isObject('abc')).toBeFalsy();
  expect(isObject(0)).toBeFalsy();
});
