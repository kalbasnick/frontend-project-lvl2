import runStylishFormatter from './stylish.js';
import runPlainFormatter from './plain.js';
import runJsonFormatter from './json.js';

export default (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return runStylishFormatter(data);
    case 'plain':
      return runPlainFormatter(data);
    case '':
    case 'json':
      return runJsonFormatter(data);
    default:
      throw new Error(`Wrong format: "${formatName}"! Available formats: "stylish", "plain" or "json"`);
  }
};
