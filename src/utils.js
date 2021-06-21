import _ from 'lodash';

export default (data) => _.isObjectLike(data) && !Array.isArray(data);
