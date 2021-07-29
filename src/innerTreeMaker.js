import _ from 'lodash';

export default (parsedData1, parsedData2) => {
  const iter = (data1, data2) => {
    const keys = _.sortBy(_.uniq([...Object.keys(data1), ...Object.keys(data2)]));

    return keys.map((parent) => {
      if (_.isPlainObject(data1[parent]) && _.isPlainObject(data2[parent])) {
        return { parent, children: iter(data1[parent], data2[parent]), type: 'nested' };
      }
      if (!_.has(data2, parent)) {
        return { parent, children: data1[parent], type: 'removed' };
      }
      if (!_.has(data1, parent)) {
        return { parent, children: data2[parent], type: 'added' };
      }
      if (_.isEqual(data1[parent], data2[parent])) {
        return { parent, children: data2[parent], type: 'unchanged' };
      }
      if (data1[parent] !== data2[parent]) {
        return { parent, children: [data1[parent], data2[parent]], type: 'changed' };
      }

      return data1[parent];
    });
  };

  return iter(parsedData1, parsedData2);
};

// export default (parsedData1, parsedData2) => {
//   const iter = (data1, data2) => {
//     const keys = _.sortBy(_.uniq([...Object.keys(data1), ...Object.keys(data2)]));

//     return keys.map((key) => {
//       if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
//         return [key, iter(data1[key], data2[key]), { status: 'nested' }];
//       }
//       if (!_.has(data2, key)) {
//         return [key, data1[key], { status: 'removed' }];
//       }
//       if (!_.has(data1, key)) {
//         return [key, data2[key], { status: 'added' }];
//       }
//       if (_.isEqual(data1[key], data2[key])) {
//         return [key, data2[key], { status: 'unchanged' }];
//       }
//       if (data1[key] !== data2[key]) {
//         return [key, [data1[key], data2[key]], { status: 'changed' }];
//       }

//       return data1[key];
//     });
//   };

//   return iter(parsedData1, parsedData2);
// };
