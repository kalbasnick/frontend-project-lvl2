import path from 'path';
import fs from 'fs';

export const readFile = (pathToData) => fs.readFileSync(pathToData, 'utf-8').trim();
export const buildFullPath = (pathToData) => path.resolve(process.cwd(), pathToData);
export const extractFormat = (pathToData) => path.extname(pathToData).substring(1);
