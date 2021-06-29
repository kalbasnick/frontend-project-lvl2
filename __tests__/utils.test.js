import { expect, test } from '@jest/globals';
import isObject from '../src/utils.js';

test('empty object', () => {
  expect(isObject({})).toBeTruthy();
});

test('array', () => {
  expect(isObject([])).toBeFalsy();
});

test('null', () => {
  expect(isObject(null)).toBeFalsy();
});

test('string', () => {
  expect(isObject('abc')).toBeFalsy();
});

test('number', () => {
  expect(isObject(0)).toBeFalsy();
});
