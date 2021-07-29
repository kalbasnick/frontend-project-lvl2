import path from 'path';
import fs from 'fs';

export default (pathToFile) => fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf-8');
