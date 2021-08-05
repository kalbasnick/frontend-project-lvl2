import path from 'path';
import fs from 'fs';

export default (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');
export const buildFullPathToFile = (pathToFile) => path.resolve(process.cwd(), pathToFile);
export const extractFormat = (pathToFile) => path.extname(pathToFile);
