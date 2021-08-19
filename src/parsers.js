import yaml from 'js-yaml';

export default (data, format) => {
  switch (format) {
    case '':
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Wrong format: ${format}! The format should be JSON or YAML`);
  }
};
