import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  let newFilePath1 = '';
  let newFilePath2 = '';
  if (filepath1.charAt(0) === '/') {
    newFilePath1 = filepath1;
  } else {
    newFilePath1 = path.resolve(process.cwd(), filepath1);
  }
  if (filepath2.charAt(0) === '/') {
    newFilePath2 = filepath2;
  } else {
    newFilePath2 = path.resolve(process.cwd(), filepath2);
  }
  const parsedFile1 = JSON.parse(fs.readFileSync(newFilePath1));
  const parsedFile2 = JSON.parse(fs.readFileSync(newFilePath2));
  const keys1 = Object.keys(parsedFile1);
  const keys2 = Object.keys(parsedFile2);
  const sortedUnitedKeys = _.sortBy(_.union(keys1, keys2));
  const commonKeys = _.intersection(keys1, keys2);
  let result = '{';
  for (let i = 0; i < sortedUnitedKeys.length; i += 1) {
    if (commonKeys.includes(sortedUnitedKeys[i]) === true) {
      if (parsedFile1[sortedUnitedKeys[i]] === parsedFile2[sortedUnitedKeys[i]]) {
        result += `\n    ${sortedUnitedKeys[i]}: ${parsedFile1[sortedUnitedKeys[i]]}`;
      } else {
        result += `\n  - ${sortedUnitedKeys[i]}: ${parsedFile1[sortedUnitedKeys[i]]}\n  + ${sortedUnitedKeys[i]}: ${parsedFile2[sortedUnitedKeys[i]]}`;
      }
    } else {
      if (keys1.includes(sortedUnitedKeys[i]) === true) {
        result += `\n  - ${sortedUnitedKeys[i]}: ${parsedFile1[sortedUnitedKeys[i]]}`;
      } else {
        result += `\n  + ${sortedUnitedKeys[i]}: ${parsedFile2[sortedUnitedKeys[i]]}`;
      }
    }
  }
  result += '\n}';
  return result;
};

export default genDiff;
