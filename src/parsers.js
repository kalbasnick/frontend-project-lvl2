import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepath) => {
  console.log(path.extname(filepath));
  switch (path.extname(filepath)) {
    case '.json':
      return JSON.parse(fs.readFileSync(path.resolve(filepath), 'utf-8'));
    case '.yml':
    case '.yaml':
      return yaml.load(fs.readFileSync(path.resolve(filepath), 'utf-8'));
    default:
      throw new Error('The file extension should be JSON or YAML');
  }
};
