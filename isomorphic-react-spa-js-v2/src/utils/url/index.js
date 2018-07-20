import * as _ from 'lodash';
import * as url from 'url';
import * as qs from 'querystring';

export const urlUtils = {
    // rawUrl - window.location.href
    parseGetParams(rawUrl) {
        const query = url.parse(rawUrl).query;
        const params = qs.parse(query);
        console.log(query);
        console.log(params);
        return params
    },
    // rawUrl - window.location.search
    parseGetParameters(rawUrl) {
        return _.chain(rawUrl)
            .replace('?', '')
            .split('&')
            .map(_.ary(_.partial(_.split, _, '='), 1))
            .fromPairs()
            .value();
    },
    // rawUrl - window.location.pathname
    getEndpoint(rawUrl) {
        return rawUrl.split('/').slice(-2)[0];
    }
};
