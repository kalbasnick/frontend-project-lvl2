import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepath) => {
  switch (path.extname(filepath)) {
    case '':
    case '.json':
      return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'));
    case '.yml':
    case '.yaml':
      return yaml.load(fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'));
    default:
      throw new Error(`Wrong file extension: ${path.extname(filepath)}! The file extension should be JSON or YAML`);
  }
};
