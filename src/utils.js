import _ from 'lodash';

const isObject = (data) => _.isObjectLike(data) && !Array.isArray(data);

export default isObject;
